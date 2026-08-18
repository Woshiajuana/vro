import { withInstall } from '../utils'
import Component from './vro-safe-area.vue'

export * from './types'

export const VroSafeArea = withInstall<typeof Component>(Component)
export default VroSafeArea

export type VroSafeAreaInstance = InstanceType<typeof VroSafeArea>

declare module 'vue' {
  export interface GlobalComponents {
    VroSafeArea: typeof VroSafeArea
  }
}
