import { withInstall } from '@vrojs/base'

import Component from './vro-van-trigger-cell.vue'

export * from './types'

export const VroVanTriggerCell = withInstall<typeof Component>(Component)
export default VroVanTriggerCell

export type VroVanTriggerCellInstance = InstanceType<typeof VroVanTriggerCell>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanTriggerCell: typeof VroVanTriggerCell
  }
}
