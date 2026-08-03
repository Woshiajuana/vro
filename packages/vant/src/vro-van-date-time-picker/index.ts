import { withInstall } from '@vrojs/base'

import Component from './vro-van-date-time-picker.vue'

export * from './types'

export const VroVanDateTimePicker = withInstall<typeof Component>(Component)
export default VroVanDateTimePicker

export type VroVanDateTimePickerInstance = InstanceType<typeof VroVanDateTimePicker>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanDateTimePicker: typeof VroVanDateTimePicker
  }
}
