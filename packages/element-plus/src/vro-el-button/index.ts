import { withInstall } from '@vrojs/core'

import Component from './vro-el-button.vue'

export * from './types'

export const VroElButton = withInstall<typeof Component>(Component)
export default VroElButton

export type VroElButtonInstance = InstanceType<typeof VroElButton>

declare module 'vue' {
  export interface GlobalComponents {
    VroElButton: typeof VroElButton
  }
}
