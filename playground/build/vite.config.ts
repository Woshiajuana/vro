import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import { VroResolver } from '@vrojs/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { GenShared, Markdown } from './plugins'

const vroPackages = ['base', 'element-plus', 'vant', 'use']

const createVroAliases = () =>
  vroPackages.flatMap((packageName) => {
    const packageDir = fileURLToPath(new URL(`../../packages/${packageName}`, import.meta.url))

    return [
      {
        find: new RegExp(`^@vrojs/${packageName}$`),
        replacement: `${packageDir}/src/index.ts`,
      },
      {
        find: new RegExp(`^@vrojs/${packageName}/(.*)$`),
        replacement: `${packageDir}/$1`,
      },
    ]
  })

export default defineConfig({
  root: './',
  base: './',
  publicDir: './public',
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('../src', import.meta.url)),
      },
      ...createVroAliases(),
    ],
  },
  plugins: [
    GenShared(),
    Markdown(),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Components({
      dts: 'typings/components.d.ts',
      extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
      resolvers: [VroResolver(), VantResolver(), ElementPlusResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.join(fileURLToPath(new URL('..', import.meta.url)), 'index.html'),
        mobile: path.join(fileURLToPath(new URL('..', import.meta.url)), 'demo.html'),
      },
    },
  },
})
