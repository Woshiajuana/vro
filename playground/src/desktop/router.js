import humps from 'humps'
import { documents } from 'virtual:shared-desktop'
import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import { listenToSyncPath, syncPathToChild } from '../utils/iframe-sync.js'

function getRoutes() {
  const routes = []

  routes.push({
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home',
    },
  })

  Object.keys(documents).forEach((key) => {
    const [name, group, sort = 9] = key.split('_')
    const component = humps.decamelize(name, { separator: '-' })

    if (component === 'home') {
      routes.push({
        name: component,
        path: '/',
        component: documents[key],
        meta: { name, group, sort: -1 },
      })
    } else {
      routes.push({
        name: component,
        path: `/${[group, component].filter(Boolean).join('/')}`,
        component: documents[key],
        meta: { name, group, sort },
      })
    }
  })

  return routes
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: getRoutes(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash }
    }

    return { top: 0 }
  },
})

router.afterEach(() => {
  nextTick(syncPathToChild)
})

listenToSyncPath(router)

window.vueRouter = router
