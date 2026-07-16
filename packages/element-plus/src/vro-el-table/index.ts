import { withInstall } from '@vrojs/base'

import Component from './vro-el-table.vue'

export * from './types'
export * from './useVroElTable'

export const VroElTable = withInstall<typeof Component>(Component)
export default VroElTable

export type VroElTableInstance = InstanceType<typeof VroElTable>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTable: typeof VroElTable
  }
}
