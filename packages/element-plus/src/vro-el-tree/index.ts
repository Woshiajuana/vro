import { withInstall } from '@vrojs/base'

import Component from './vro-el-tree.vue'

export * from './types'

export const VroElTree = withInstall<typeof Component>(Component)
export default VroElTree

export type VroElTreeInstance = InstanceType<typeof VroElTree>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTree: typeof VroElTree
  }
}
