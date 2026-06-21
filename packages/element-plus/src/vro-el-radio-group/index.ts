import { withInstall } from '@vrojs/base'

import Component from './vro-el-radio-group.vue'

export * from './types'

export const VroElRadioGroup = withInstall<typeof Component>(Component)
export default VroElRadioGroup

export type VroElRadioGroupInstance = InstanceType<typeof VroElRadioGroup>

declare module 'vue' {
  export interface GlobalComponents {
    VroElRadioGroup: typeof VroElRadioGroup
  }
}
