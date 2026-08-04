import { withInstall } from '@vrojs/base'

import Component from './vro-van-datetime-picker.vue'

export * from './function-call'
export * from './types'

export const VroVanDatetimePicker = withInstall<typeof Component>(Component)
export default VroVanDatetimePicker

export type VroVanDatetimePickerInstance = InstanceType<typeof VroVanDatetimePicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanDatetimePicker: typeof VroVanDatetimePicker
  }
}
