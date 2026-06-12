import { withInstall } from '@vrojs/base'

import Component from './vro-el-checkbox-group.vue'

export * from './types'

export const VroElCheckboxGroup = withInstall<typeof Component>(Component)
export default VroElCheckboxGroup

export type VroElCheckboxGroupInstance = InstanceType<typeof VroElCheckboxGroup>

declare module 'vue' {
  export interface GlobalComponents {
    VroElCheckboxGroup: typeof VroElCheckboxGroup
  }
}
