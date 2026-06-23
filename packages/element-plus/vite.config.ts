import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const root = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(root, 'src')
const importRE = /import\s+['"]([^'"]+)['"]/g

const entries = collectEntries(srcDir)

console.log('entries => ', JSON.stringify(entries))

export default defineConfig({
  plugins: [
    Vue(),
    injectCssImports(),
    Dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: resolve(root, 'tsconfig.json'),
      exclude: ['src/**/demo/**/*', 'src/**/README.md', 'vite.config.ts'],
    }),
  ],
  build: {
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^@daysnap\//,
        /^@element-plus\/icons-vue/,
        /^@vrojs\//,
        /^element-plus/,
        /^vue/,
        /^vue-draggable-plus/,
        'copy-to-clipboard',
      ],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
})

function injectCssImports() {
  return {
    name: 'inject-css-imports',
    // Vite 库模式会把 scss 抽成 css 资源，但 preserveModules 下的 style 入口不会自动 import 这些 css。
    // 这里在产物生成阶段，把 style/css.js、style/index.js 对应的 css 资源补回入口文件里，
    // 这样用户 import '@vrojs/element-plus/xxx/style/css' 时可以真正带上组件样式。
    generateBundle(_: unknown, bundle: Record<string, any>) {
      Object.values(bundle).forEach((chunk) => {
        if (chunk.type !== 'chunk') {
          return
        }

        const importCode = createCssImportCode(chunk, bundle)

        if (importCode) {
          chunk.code = `${importCode}\n${chunk.code}`
        }
      })
    },
  }
}

function createCssImportCode(chunk: any, bundle: Record<string, any>) {
  // 只处理 src/**/style/css.ts 对应的 js chunk，普通组件入口不需要注入 css。
  const cssEntry = getCssEntry(chunk.fileName)

  if (!cssEntry) {
    return ''
  }

  // 根据源码里的 scss 依赖找到 Vite 生成的 css 资源，并按当前 chunk 位置生成相对 import。
  const importedCss = collectCssAssets(cssEntry).filter((css) => bundle[css])
  const imports = importedCss
    .sort()
    .map((css) => `import '${toRelativeImport(chunk.fileName, css)}';`)
  return imports.join('\n')
}

function getCssEntry(fileName: string) {
  // style/index.ts 也会 import style/css.ts，所以这两个入口都需要补 css import。
  const isStyleEntry =
    fileName === 'style/css.js' ||
    fileName === 'style/index.js' ||
    fileName.endsWith('/style/css.js') ||
    fileName.endsWith('/style/index.js')

  if (!isStyleEntry) {
    return
  }

  // dist/vro-el-x/style/css.js -> src/vro-el-x/style/css.ts
  return resolve(srcDir, fileName.replace(/style\/(?:css|index)\.js$/, 'style/css.ts'))
}

function collectCssAssets(entry: string, visited = new Set<string>()) {
  // 处理组件样式之间的相互引用，避免 schema-form 这类组合组件漏掉依赖样式。
  if (visited.has(entry)) {
    return []
  }

  visited.add(entry)

  const code = readFileSync(entry, 'utf-8')
  const assets = new Set<string>()
  let match: RegExpExecArray | null

  importRE.lastIndex = 0
  while ((match = importRE.exec(code))) {
    const source = match[1]

    // scss 会被 Vite 输出为同路径的 css 资源。
    if (source.endsWith('.scss')) {
      assets.add(toCssAsset(resolve(dirname(entry), source)))
      continue
    }

    // 递归处理相对路径导入的 style/css.ts，例如 '../../vro-el-tree/style/css'。
    if (source.startsWith('.')) {
      const cssEntry = resolve(dirname(entry), `${source}.ts`)

      if (existsSync(cssEntry)) {
        collectCssAssets(cssEntry, visited).forEach((asset) => assets.add(asset))
      }
    }
  }

  return [...assets]
}

function toCssAsset(scssFile: string) {
  // src/vro-el-x/style/index.scss -> vro-el-x/style/index.css
  return relative(srcDir, scssFile).replace(/\.scss$/, '.css')
}

function toRelativeImport(from: string, to: string) {
  // 生成当前 js chunk 到 css 资源的相对路径，保证发布后的 dist 内路径可用。
  const relativePath = relative(dirname(from), to)
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`
}

function collectEntries(dir: string) {
  // 把 src 下所有 ts 文件作为入口，配合 preserveModules 输出同构的 dist 目录。
  const entries: Record<string, string> = {}
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filepath = resolve(dir, file)
    const stats = statSync(filepath)

    if (stats.isDirectory()) {
      // demo 只用于文档站，不进入 npm 包产物。
      if (file === 'demo') {
        return
      }
      Object.assign(entries, collectEntries(filepath))
      return
    }

    // 只收集 ts 入口；vue 文件会通过对应 index.ts 引入后被打包。
    if (file.endsWith('.ts')) {
      entries[relative(srcDir, filepath).replace(/\.ts$/, '')] = filepath
    }
  })

  return entries
}
