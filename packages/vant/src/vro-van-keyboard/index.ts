import { withInstall } from '@vrojs/base'

import Component from './vro-van-keyboard.vue'

export * from './types'

export const VroVanKeyboard = withInstall<typeof Component>(Component)
export default VroVanKeyboard

export type VroVanKeyboardInstance = InstanceType<typeof VroVanKeyboard>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanKeyboard: typeof VroVanKeyboard
  }
}
