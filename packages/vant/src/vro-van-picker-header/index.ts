import { withInstall } from '@vrojs/base'

import Component from './vro-van-picker-header.vue'

export * from './types'

export const VroVanPickerHeader = withInstall<typeof Component>(Component)
export default VroVanPickerHeader

export type VroVanPickerHeaderInstance = InstanceType<typeof VroVanPickerHeader>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanPickerHeader: typeof VroVanPickerHeader
  }
}
