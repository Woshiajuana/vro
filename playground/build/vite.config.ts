import Vue from '@vitejs/plugin-vue'
import { VroResolver } from '@vrojs/resolver'
import path from 'path'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig } from 'vite'

import { GenShared, Markdown } from './plugins/index'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  base: './',
  publicDir: './public',
  server: {
    host: '0.0.0.0',
    port: 10086,
  },
  optimizeDeps: {
    // https://github.com/youzan/vant/issues/10930
    include: ['vue', 'vue-router'],
  },
  plugins: [
    // 生成 code
    GenShared(),

    // vue plugin
    // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // markdown
    Markdown(),

    // 设置 component name
    DefineOptions(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'typings/components.d.ts',
      extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
      resolvers: [
        // vant 按需引入
        // https://vant-ui.github.io/vant/#/zh-CN/quickstart
        VantResolver(),
        VroResolver(),
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        // /[/\\]node_modules[/\\][@\\]vrojs[/\\]/,
        // /[/\\]shared-mobile[/\\]/,
      ],
      exclude: [],
    }),
  ],

  build: {
    outDir: 'dist',
    reportCompressedSize: false,
    emptyOutDir: true,
    // https://github.com/vant-ui/vant/issues/9703
    cssTarget: ['chrome53'],
    rollupOptions: {
      input: {
        main: path.join(__dirname, '..', 'index.html'),
        mobile: path.join(__dirname, '..', 'mobile.html'),
      },
      output: {
        manualChunks: {
          'vue-libs': ['vue', 'vue-router'],
        },
      },
    },
  },
})
