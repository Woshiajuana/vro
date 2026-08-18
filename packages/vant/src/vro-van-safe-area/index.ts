import { withInstall } from '@vrojs/base'

import Component from './vro-van-safe-area.vue'

export * from './types'

export const VroVanSafeArea = withInstall<typeof Component>(Component)
export default VroVanSafeArea

export type VroVanSafeAreaInstance = InstanceType<typeof VroVanSafeArea>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanSafeArea: typeof VroVanSafeArea
  }
}
