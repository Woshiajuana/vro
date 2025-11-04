import { fileURLToPath, URL } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((x) => {
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

    plugins: [Vue()],
  }
})
