import { documents } from 'virtual:shared-desktop'
import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import { errorHandler, listenToSyncPath, syncPathToChild } from '@/utils'

const firstDocument = documents[0]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: firstDocument?.path ?? '/404',
    },
    ...documents,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash }
    }

    return { top: 0 }
  },
})

router.onError(errorHandler)

router.afterEach(() => {
  nextTick(syncPathToChild)
})

listenToSyncPath(router)

window.vueRouter = router
