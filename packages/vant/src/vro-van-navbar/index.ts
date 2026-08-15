import { withInstall } from '@vrojs/base'

import Component from './vro-van-navbar.vue'

export * from './types'

export const VroVanNavbar = withInstall<typeof Component>(Component)
export default VroVanNavbar

export type VroVanNavbarInstance = InstanceType<typeof VroVanNavbar>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanNavbar: typeof VroVanNavbar
  }
}
