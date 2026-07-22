import { withInstall } from '@vrojs/base'

import Component from './vro-van-radio.vue'

export * from './types'

export const VroVanRadio = withInstall<typeof Component>(Component)
export default VroVanRadio

export type VroVanRadioInstance = InstanceType<typeof VroVanRadio>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanRadio: typeof VroVanRadio
  }
}
