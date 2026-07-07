import { withInstall } from '@vrojs/base'

import Component from './vro-van-cell.vue'

export * from './types'

export const VroVanCell = withInstall<typeof Component>(Component)
export default VroVanCell

export type VroVanCellInstance = InstanceType<typeof VroVanCell>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanCell: typeof VroVanCell
  }
}
