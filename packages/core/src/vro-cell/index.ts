import { withInstall } from '../utils'
import Component from './vro-cell.vue'

export * from './types'

export const VroCell = withInstall<typeof Component>(Component)
export default VroCell

export type VroCellInstance = InstanceType<typeof VroCell>

declare module 'vue' {
  export interface GlobalComponents {
    VroCell: typeof VroCell
  }
}
