import { withInstall } from '../utils'
import Component from './vro-circle-progress.vue'

export * from './types'

export const VroCircleProgress = withInstall<typeof Component>(Component)
export default VroCircleProgress

export type VroCircleProgressInstance = InstanceType<typeof VroCircleProgress>

declare module 'vue' {
  export interface GlobalComponents {
    VroCircleProgress: typeof VroCircleProgress
  }
}
