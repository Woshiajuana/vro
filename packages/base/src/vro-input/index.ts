import { withInstall } from '../utils'
import Component from './vro-input.vue'

export * from './types'

export const VroInput = withInstall<typeof Component>(Component)
export default VroInput

export type VroInputInstance = InstanceType<typeof VroInput>

declare module 'vue' {
  export interface GlobalComponents {
    VroInput: typeof VroInput
  }
}
