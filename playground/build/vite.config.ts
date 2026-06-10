import { fileURLToPath, URL } from 'node:url'

import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import { VroResolver } from '@vrojs/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'

import { playgroundRoutes } from './plugins/playground-routes'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: './',
    base: './',
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
          find: /^@vrojs\/core$/,
          replacement: fileURLToPath(new URL('../../packages/core/src/index.ts', import.meta.url)),
        },
        {
          find: /^@vrojs\/core\/(.*)$/,
          replacement: `${fileURLToPath(new URL('../../packages/core', import.meta.url))}/$1`,
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
      playgroundRoutes(),
      Markdown({
        markdownItOptions: {
          html: true,
        },
      }),
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),
      Components({
        dts: 'typings/components.d.ts',
        extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
        resolvers: [VroResolver(), VantResolver(), ElementPlusResolver()],
      }),
    ],
  }
})
