import { withInstall } from '@vrojs/base'

import Component from './vro-van-view.vue'

export * from './types'

export const VroVanView = withInstall<typeof Component>(Component)
export default VroVanView

export type VroVanViewInstance = InstanceType<typeof VroVanView>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanView: typeof VroVanView
  }
}
