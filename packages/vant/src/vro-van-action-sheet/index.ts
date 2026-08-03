import { withInstall } from '@vrojs/base'

import Component from './vro-van-action-sheet.vue'

export * from './function-call'
export * from './types'

export const VroVanActionSheet = withInstall<typeof Component>(Component)
export default VroVanActionSheet

export type VroVanActionSheetInstance = InstanceType<typeof VroVanActionSheet>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanActionSheet: typeof VroVanActionSheet
  }
}
