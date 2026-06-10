import { createRouter, createWebHashHistory } from 'vue-router'
import { demoRoutes, docsRoutes } from 'virtual:vro-playground-routes'

import { errorHandler } from '@/utils'

const firstDocsRoute = docsRoutes[0]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: firstDocsRoute?.path ?? '/404' },
    ...docsRoutes,
    ...demoRoutes,

    // 404
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
    { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
  ],
})

router.onError(errorHandler)
