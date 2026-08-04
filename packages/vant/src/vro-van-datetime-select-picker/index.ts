import { withInstall } from '@vrojs/base'

import Component from './vro-van-datetime-select-picker.vue'

export * from './types'

export const VroVanDatetimeSelectPicker = withInstall<typeof Component>(Component)
export default VroVanDatetimeSelectPicker

export type VroVanDatetimeSelectPickerInstance = InstanceType<typeof VroVanDatetimeSelectPicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanDatetimeSelectPicker: typeof VroVanDatetimeSelectPicker
  }
}
