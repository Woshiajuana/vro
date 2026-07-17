import { withInstall } from '@vrojs/base'

import Component from './vro-el-table-column.vue'

export * from './types'

export const VroElTableColumn = withInstall<typeof Component>(Component)
export default VroElTableColumn

export type VroElTableColumnInstance = InstanceType<typeof VroElTableColumn>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTableColumn: typeof VroElTableColumn
  }
}
