import type { PluginOption } from 'vite'

import { genSharedDesktop } from './genSharedDesktop'
import { genSharedMobile } from './genSharedMobile'

export function GenShared(): PluginOption {
  const virtualSharedDesktopModuleId = 'virtual:shared-desktop'
  const resolvedVirtualSharedDesktopModuleId = `resolved:${virtualSharedDesktopModuleId}`

  const virtualSharedMobileModuleId = 'virtual:shared-mobile'
  const resolvedVirtualSharedMobileModuleId = `resolved:${virtualSharedMobileModuleId}`

  return {
    name: 'vro:shared',
    enforce: 'pre',

    resolveId(id) {
      if (id === virtualSharedDesktopModuleId) {
        return resolvedVirtualSharedDesktopModuleId
      }

      if (id === virtualSharedMobileModuleId) {
        return resolvedVirtualSharedMobileModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualSharedDesktopModuleId) {
        return genSharedDesktop()
      }

      if (id === resolvedVirtualSharedMobileModuleId) {
        return genSharedMobile()
      }
    },
  }
}
