import { withInstall } from '../utils'
import Component from './vro-aspect-ratio.vue'

export * from './types'

export const VroAspectRatio = withInstall<typeof Component>(Component)
export default VroAspectRatio

export type VroAspectRatioInstance = InstanceType<typeof VroAspectRatio>

declare module 'vue' {
  export interface GlobalComponents {
    VroAspectRatio: typeof VroAspectRatio
  }
}
