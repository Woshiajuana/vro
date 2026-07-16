import { withInstall } from '@vrojs/base'

import Component from './vro-el-table-column-group.vue'

export * from './types'
export * from './useVroElTableColumnGroup'
export * from './vroElTableColumnGroupColumnManager'

export const VroElTableColumnGroup = withInstall<typeof Component>(Component)
export default VroElTableColumnGroup

export type VroElTableColumnGroupInstance = InstanceType<typeof VroElTableColumnGroup>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTableColumnGroup: typeof VroElTableColumnGroup
  }
}
