import { withInstall } from '@vrojs/base'

import Component from './vro-el-select.vue'

export * from './types'

export const VroElSelect = withInstall<typeof Component>(Component)
export default VroElSelect

export type VroElSelectInstance = InstanceType<typeof VroElSelect>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSelect: typeof VroElSelect
  }
}
