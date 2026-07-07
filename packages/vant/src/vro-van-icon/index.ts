import { withInstall } from '@vrojs/base'

import Component from './vro-van-icon.vue'

export * from './types'

export const VroVanIcon = withInstall<typeof Component>(Component)
export default VroVanIcon

export type VroVanIconInstance = InstanceType<typeof VroVanIcon>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanIcon: typeof VroVanIcon
  }
}
