import type { PluginOption } from 'vite'

import { genSharedDesktop } from './genSharedDesktop'
import { genShareMobile } from './genShareMobile'

export function GenShared(): PluginOption {
  // desktop
  const virtualSharedDesktopModuleId = 'virtual:shared-desktop'
  const resolvedVirtualSharedDesktopModuleId = `resolved:${virtualSharedDesktopModuleId}`

  // mobile
  const virtualSharedMobileModuleId = 'virtual:shared-mobile'
  const resolvedVirtualSharedMobileModuleId = `resolved:${virtualSharedMobileModuleId}`

  return {
    name: 'vro:shared',

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
        return genShareMobile()
      }
    },
  }
}
