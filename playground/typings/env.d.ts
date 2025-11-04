/// <reference types="vite/client" />

import 'vue-router'

// router
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
  }
}
