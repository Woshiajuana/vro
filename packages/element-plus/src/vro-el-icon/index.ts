import { withInstall } from '@vrojs/core'

import Component from './vro-el-icon.vue'

export * from './types'

export const VroElIcon = withInstall<typeof Component>(Component)
export default VroElIcon

export type VroElIconInstance = InstanceType<typeof VroElIcon>

declare module 'vue' {
  export interface GlobalComponents {
    VroElIcon: typeof VroElIcon
  }
}
