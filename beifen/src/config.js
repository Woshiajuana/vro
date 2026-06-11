import { parsePath } from '@daysnap/utils'

export default {
  name: 'Vro',
  build: {
    srcDir: 'src',
    tagPrefix: 'van-',
    namedExport: true,
    skipInstall: ['lazyload'],
    packageManager: 'pnpm',
    extensions: {
      esm: '.mjs',
    },
    site: {
      publicPath: (typeof window === 'undefined' && process.env.PUBLIC_PATH) || '/vant/',
    },
    vetur: {
      tagPrefix: 'van-',
    },
    css: {
      removeSourceFile: true,
    },
  },
  site: {
    defaultLang: 'en-US',
    darkModeClass: 'van-theme-dark',
    lightModeClass: 'van-theme-light',
    enableVConsole: false,
    versions: [{ label: 'v1', link: '/vant/v1/' }],
    baiduAnalytics: {
      seed: 'af5d41bc4e446e76665dbe3ec18d55c3',
    },

    title: 'Vro',
    subtitle: '（基于 vue3 组件库）',
    description: '基于 vue3 组件库',
    logo: '/img/logo.png',
    langLabel: '中',
    links: [
      {
        logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/github.svg',
        url: 'https://github.com/daysnap',
      },
    ],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'hor-cell',
            title: 'Cell 单元格',
          },
          {
            path: 'hor-icon',
            title: 'Icon 图标',
          },
        ],
      },
    ],
  },
  // 中文翻译
  keyToText: (key) => {
    const source = {
      docs: {
        __name: '开发指南',
        Home: '介绍',
      },
      ui: {
        __name: 'UI组件',
      },
      use: {
        __name: '组合式API',
      },
      jssdk: {
        __name: '容器 jssdk',
      },
    }
    return parsePath(source, key)
  },
}
