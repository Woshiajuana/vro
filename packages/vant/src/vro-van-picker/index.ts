import { withInstall } from '@vrojs/base'

import Component from './vro-van-picker.vue'

export * from './function-call'
export * from './types'

export const VroVanPicker = withInstall<typeof Component>(Component)
export default VroVanPicker

export type VroVanPickerInstance = InstanceType<typeof VroVanPicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanPicker: typeof VroVanPicker
  }
}
