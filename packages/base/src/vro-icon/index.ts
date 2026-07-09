import { withInstall } from '../utils'
import Component from './vro-icon.vue'

export * from './types'

export const VroIcon = withInstall<typeof Component>(Component)
export default VroIcon

export type VroIconInstance = InstanceType<typeof VroIcon>

declare module 'vue' {
  export interface GlobalComponents {
    VroIcon: typeof VroIcon
  }
}
