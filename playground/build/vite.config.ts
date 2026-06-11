import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import { VroResolver } from '@vrojs/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { GenShared, Markdown } from './plugins'

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
      {
        find: /^@vrojs\/base$/,
        replacement: fileURLToPath(new URL('../../packages/base/src/index.ts', import.meta.url)),
      },
      {
        find: /^@vrojs\/base\/(.*)$/,
        replacement: `${fileURLToPath(new URL('../../packages/base', import.meta.url))}/$1`,
      },
      {
        find: /^@vrojs\/element-plus$/,
        replacement: fileURLToPath(
          new URL('../../packages/element-plus/src/index.ts', import.meta.url),
        ),
      },
      {
        find: /^@vrojs\/element-plus\/(.*)$/,
        replacement: `${fileURLToPath(new URL('../../packages/element-plus', import.meta.url))}/$1`,
      },
      {
        find: /^@vrojs\/vant$/,
        replacement: fileURLToPath(new URL('../../packages/vant/src/index.ts', import.meta.url)),
      },
      {
        find: /^@vrojs\/vant\/(.*)$/,
        replacement: `${fileURLToPath(new URL('../../packages/vant', import.meta.url))}/$1`,
      },
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
