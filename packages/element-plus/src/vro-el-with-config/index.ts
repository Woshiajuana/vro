import { withInstall } from '@vrojs/base'

import Component from './vro-el-with-config.vue'

export * from './types'

export const VroElWithConfig = withInstall<typeof Component>(Component)
export default VroElWithConfig

export type VroElWithConfigInstance = InstanceType<typeof VroElWithConfig>

declare module 'vue' {
  export interface GlobalComponents {
    VroElWithConfig: typeof VroElWithConfig
  }
}
