import { withInstall } from '@vrojs/base'

import Component from './vro-van-with-config.vue'

export * from './types'

export const VroVanWithConfig = withInstall<typeof Component>(Component)
export default VroVanWithConfig

export type VroVanWithConfigInstance = InstanceType<typeof VroVanWithConfig>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanWithConfig: typeof VroVanWithConfig
  }
}
