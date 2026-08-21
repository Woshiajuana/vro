import { withInstall } from '@vrojs/base'

import Component from './vro-van-picker-toolbar.vue'

export * from './types'

export const VroVanPickerToolbar = withInstall<typeof Component>(Component)
export default VroVanPickerToolbar

export type VroVanPickerToolbarInstance = InstanceType<typeof VroVanPickerToolbar>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanPickerToolbar: typeof VroVanPickerToolbar
  }
}
