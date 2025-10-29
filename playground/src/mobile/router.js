import { createRouter, createWebHashHistory } from 'vue-router'
import humps from 'humps'
import { demos } from 'virtual:shared-mobile'
import { nextTick, watch } from 'vue'
import DemoHome from './components/DemoHome.vue'
import { listenToSyncPath, syncPathToParent } from '../utils/iframe-sync.js'

function getRoutes() {
  const routes = []

  routes.push({
    name: 'NotFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home',
    },
  })

  routes.push({
    name: 'home',
    path: '/',
    component: DemoHome,
  })
  console.log('demos =>', demos)
  Object.keys(demos).forEach((key) => {
    const [name, group, sort = 9] = key.split('_')
    const component = humps.decamelize(name, { separator: '-' })

    routes.push({
      name: component,
      path: `/${[group, component].filter(Boolean).join('/')}`,
      component: demos[key],
      meta: { name, group, sort },
    })
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

watch(router.currentRoute, () => {
  if (!router.currentRoute.value.redirectedFrom) {
    nextTick(syncPathToParent)
  }
})

listenToSyncPath(router)

window.vueRouter = router
