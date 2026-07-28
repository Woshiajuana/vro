import { withInstall } from '@vrojs/base'

import Component from './vro-el-table-actions-column.vue'

export * from './types'

export const VroElTableActionsColumn = withInstall<typeof Component>(Component)
export default VroElTableActionsColumn

export type VroElTableActionsColumnInstance = InstanceType<typeof VroElTableActionsColumn>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTableActionsColumn: typeof VroElTableActionsColumn
  }
}
