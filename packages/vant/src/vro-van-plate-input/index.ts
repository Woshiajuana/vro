import { withInstall } from '@vrojs/base'

import Component from './vro-van-plate-input.vue'

export * from './types'

export const VroVanPlateInput = withInstall<typeof Component>(Component)
export default VroVanPlateInput

export type VroVanPlateInputInstance = InstanceType<typeof VroVanPlateInput>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanPlateInput: typeof VroVanPlateInput
  }
}
