import { withInstall } from '@vrojs/base'

import Component from './vro-van-select-picker.vue'

export * from './types'

export const VroVanSelectPicker = withInstall<typeof Component>(Component)
export default VroVanSelectPicker

export type VroVanSelectPickerInstance = InstanceType<typeof VroVanSelectPicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanSelectPicker: typeof VroVanSelectPicker
  }
}
