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
  const cssEntry = getCssEntry(chunk.fileName)

  if (!cssEntry) {
    return ''
  }

  const importedCss = collectCssAssets(cssEntry).filter((css) => bundle[css])
  const imports = importedCss
    .sort()
    .map((css) => `import '${toRelativeImport(chunk.fileName, css)}';`)
  return imports.join('\n')
}

function getCssEntry(fileName: string) {
  const isStyleEntry =
    fileName === 'style/css.js' ||
    fileName === 'style/index.js' ||
    fileName.endsWith('/style/css.js') ||
    fileName.endsWith('/style/index.js')

  if (!isStyleEntry) {
    return
  }

  return resolve(srcDir, fileName.replace(/style\/(?:css|index)\.js$/, 'style/css.ts'))
}

function collectCssAssets(entry: string, visited = new Set<string>()) {
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

    if (source.endsWith('.scss')) {
      assets.add(toCssAsset(resolve(dirname(entry), source)))
      continue
    }

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
  return relative(srcDir, scssFile).replace(/\.scss$/, '.css')
}

function toRelativeImport(from: string, to: string) {
  const relativePath = relative(dirname(from), to)
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`
}

function collectEntries(dir: string) {
  const entries: Record<string, string> = {}
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filepath = resolve(dir, file)
    const stats = statSync(filepath)

    if (stats.isDirectory()) {
      if (file === 'demo') {
        return
      }
      Object.assign(entries, collectEntries(filepath))
      return
    }

    if (file.endsWith('.ts')) {
      entries[relative(srcDir, filepath).replace(/\.ts$/, '')] = filepath
    }
  })

  return entries
}
