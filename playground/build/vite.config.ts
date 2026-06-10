import { fileURLToPath, URL } from 'node:url'

import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import { VroResolver } from '@vrojs/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: './',
    base: './',
    server: {
      host: '0.0.0.0',
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
      },
    },

    plugins: [
      Vue(),
      Components({
        dts: 'typings/components.d.ts',
        extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
        resolvers: [VroResolver(), VantResolver(), ElementPlusResolver()],
      }),
    ],
  }
})
