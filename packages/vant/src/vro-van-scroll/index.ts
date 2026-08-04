import { withInstall } from '@vrojs/base'

import Component from './vro-van-scroll.vue'

export * from './types'

export const VroVanScroll = withInstall<typeof Component>(Component)
export default VroVanScroll

export type VroVanScrollInstance = InstanceType<typeof VroVanScroll>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanScroll: typeof VroVanScroll
  }
}
