import { withInstall } from '@vrojs/base'

import Component from './vro-van-datetime-range-select-picker.vue'

export * from './types'

export const VroVanDatetimeRangeSelectPicker = withInstall<typeof Component>(Component)
export default VroVanDatetimeRangeSelectPicker

export type VroVanDatetimeRangeSelectPickerInstance = InstanceType<
  typeof VroVanDatetimeRangeSelectPicker
>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanDatetimeRangeSelectPicker: typeof VroVanDatetimeRangeSelectPicker
  }
}
