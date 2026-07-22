import { withInstall } from '@vrojs/base'

import Component from './vro-van-cell-group.vue'

export * from './types'

export const VroVanCellGroup = withInstall<typeof Component>(Component)
export default VroVanCellGroup

export type VroVanCellGroupInstance = InstanceType<typeof VroVanCellGroup>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanCellGroup: typeof VroVanCellGroup
  }
}
