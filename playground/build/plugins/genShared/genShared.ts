import type { PluginOption } from 'vite'

import { genSharedRoutes } from './genSharedRoutes'

export function GenShared(): PluginOption {
  const virtualSharedModuleId = 'virtual:vro-playground-routes'
  const resolvedVirtualSharedModuleId = `resolved:${virtualSharedModuleId}`

  return {
    name: 'vro:shared',
    enforce: 'pre',

    resolveId(id) {
      if (id === virtualSharedModuleId) {
        return resolvedVirtualSharedModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualSharedModuleId) {
        return genSharedRoutes()
      }
    },
  }
}
