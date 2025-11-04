import { withInstall } from '../utils'
import Component from './vro-cell-group.vue'

export * from './types'

export const VroCellGroup = withInstall<typeof Component>(Component)
export default VroCellGroup

export type VroCellGroupInstance = InstanceType<typeof VroCellGroup>

declare module 'vue' {
  export interface GlobalComponents {
    VroCellGroup: typeof VroCellGroup
  }
}
