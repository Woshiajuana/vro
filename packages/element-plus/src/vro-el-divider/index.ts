import { withInstall } from '@vrojs/base'

import Component from './vro-el-divider.vue'

export * from './types'

export const VroElDivider = withInstall<typeof Component>(Component)
export default VroElDivider

export type VroElDividerInstance = InstanceType<typeof VroElDivider>

declare module 'vue' {
  export interface GlobalComponents {
    VroElDivider: typeof VroElDivider
  }
}
