import { withInstall } from '@vrojs/base'

import Component from './vro-van-radio-button.vue'

export * from './types'

export const VroVanRadioButton = withInstall<typeof Component>(Component)
export default VroVanRadioButton

export type VroVanRadioButtonInstance = InstanceType<typeof VroVanRadioButton>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanRadioButton: typeof VroVanRadioButton
  }
}
