import { withInstall } from '@vrojs/base'

import Component from './vro-van-checkbox.vue'

export * from './types'

export const VroVanCheckbox = withInstall<typeof Component>(Component)
export default VroVanCheckbox

export type VroVanCheckboxInstance = InstanceType<typeof VroVanCheckbox>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanCheckbox: typeof VroVanCheckbox
  }
}
