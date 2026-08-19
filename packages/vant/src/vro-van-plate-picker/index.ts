import { withInstall } from '@vrojs/base'

import Component from './vro-van-plate-picker.vue'

export * from './types'

export const VroVanPlatePicker = withInstall<typeof Component>(Component)
export default VroVanPlatePicker

export type VroVanPlatePickerInstance = InstanceType<typeof VroVanPlatePicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanPlatePicker: typeof VroVanPlatePicker
  }
}
