import { demos } from 'virtual:shared-mobile'
import { createRouter, createWebHashHistory } from 'vue-router'

import { errorHandler, useIframePathSync } from '@/utils'

import DemoHome from './components/DemoHome.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DemoHome,
    },
    ...demos,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.onError(errorHandler)
useIframePathSync(router, 'mobile')
