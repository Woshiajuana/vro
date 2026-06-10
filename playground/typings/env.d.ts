/// <reference types="vite/client" />

import 'vue-router'
import type { Router } from 'vue-router'

// router
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
    type?: 'docs' | 'demo'
    packageName?: string
    componentDir?: string
  }
}

declare global {
  interface Window {
    vueRouter: Router
  }
}
