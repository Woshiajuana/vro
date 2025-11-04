import { createRouter, createWebHashHistory } from 'vue-router'

import { errorHandler } from '@/utils'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 404
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
    { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
  ],
})

router.onError(errorHandler)
