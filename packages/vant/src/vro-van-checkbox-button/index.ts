import { withInstall } from '@vrojs/base'

import Component from './vro-van-checkbox-button.vue'

export * from './types'

export const VroVanCheckboxButton = withInstall<typeof Component>(Component)
export default VroVanCheckboxButton

export type VroVanCheckboxButtonInstance = InstanceType<typeof VroVanCheckboxButton>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanCheckboxButton: typeof VroVanCheckboxButton
  }
}
