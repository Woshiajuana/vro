import { createRouter, createWebHashHistory } from 'vue-router'
import { demoRoutes } from 'virtual:vro-playground-routes'

import { errorHandler } from '@/utils'
import DemoHome from './components/DemoHome.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: DemoHome },
    ...demoRoutes,
    { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.onError(errorHandler)
