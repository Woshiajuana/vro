import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const root = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(root, 'src')
const importRE = /import\s+['"]([^'"]+)['"]/g

const entries = collectEntries(srcDir)

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
    // 这里在产物生成阶段，把 style/css.js、style/deps.js、style/index.js 按源码 import 顺序重建，
    // 这样用户 import '@vrojs/element-plus/xxx/style/css' 时可以真正带上组件样式。
    generateBundle(_: unknown, bundle: Record<string, any>) {
      Object.values(bundle).forEach((chunk) => {
        if (chunk.type !== 'chunk') {
          return
        }

        const importCode = createStyleImportCode(chunk, bundle)

        if (importCode !== undefined) {
          chunk.code = importCode
          return
        }

        chunk.code = normalizePackageImports(chunk.code)
      })
    },
  }
}

function normalizePackageImports(code: string) {
  return code.replace(/(['"])@vrojs\/([^'"]+)\/src\//g, '$1@vrojs/$2/dist/')
}

function normalizePackageImport(source: string) {
  return source.replace(/^@vrojs\/([^/]+)\/src\//, '@vrojs/$1/dist/')
}

function createStyleImportCode(chunk: any, bundle: Record<string, any>) {
  // 只处理 src/**/style/*.ts 对应的 js chunk，普通组件入口不需要注入 css。
  const styleEntry = getStyleEntry(chunk.fileName)

  if (!styleEntry) {
    return
  }

  const imports = collectStyleImports(styleEntry, chunk.fileName, bundle)
  return imports.length ? `${imports.join('\n')}\n` : ''
}

function getStyleEntry(fileName: string) {
  // style/index.ts 会 import deps 和 css，所以三个样式入口都按源码 import 顺序重建。
  const isStyleEntry =
    fileName === 'style/css.js' ||
    fileName === 'style/deps.js' ||
    fileName === 'style/index.js' ||
    fileName.endsWith('/style/css.js') ||
    fileName.endsWith('/style/deps.js') ||
    fileName.endsWith('/style/index.js')

  if (!isStyleEntry) {
    return
  }

  // dist/vro-el-x/style/css.js -> src/vro-el-x/style/css.ts
  return resolve(srcDir, fileName.replace(/\.js$/, '.ts'))
}

function collectStyleImports(entry: string, fileName: string, bundle: Record<string, any>) {
  const code = readFileSync(entry, 'utf-8')
  const imports: string[] = []
  let match: RegExpExecArray | null

  importRE.lastIndex = 0
  while ((match = importRE.exec(code))) {
    const source = match[1]

    // scss/css 会被 Vite 输出为同路径的 css 资源。
    if (source.endsWith('.scss') || source.endsWith('.css')) {
      const css = toCssAsset(resolve(dirname(entry), source))

      if (bundle[css]) {
        imports.push(`import '${toRelativeImport(fileName, css)}';`)
      }

      continue
    }

    if (source.startsWith('.')) {
      const js = toJsChunk(resolve(dirname(entry), `${source}.ts`))

      if (bundle[js]) {
        imports.push(`import '${toRelativeImport(fileName, js)}';`)
      }

      continue
    }

    imports.push(`import '${normalizePackageImport(source)}';`)
  }

  return imports
}

function toCssAsset(scssFile: string) {
  // src/vro-el-x/style/index.scss -> vro-el-x/style/index.css
  return relative(srcDir, scssFile).replace(/\.(s)?css$/, '.css')
}

function toJsChunk(tsFile: string) {
  return relative(srcDir, tsFile).replace(/\.ts$/, '.js')
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
