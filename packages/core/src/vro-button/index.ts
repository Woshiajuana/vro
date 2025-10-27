import { withInstall } from '../utils'
import Component from './vro-button.vue'

export * from './types'

export const VroButton = withInstall<typeof Component>(Component)
export default VroButton

export type VroButtonInstance = InstanceType<typeof VroButton>

declare module 'vue' {
  export interface GlobalComponents {
    VroButton: typeof VroButton
  }
}
