import { readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const root = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(root, 'src')

const entries = collectEntries(srcDir)

export default defineConfig({
  plugins: [
    Vue(),
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
