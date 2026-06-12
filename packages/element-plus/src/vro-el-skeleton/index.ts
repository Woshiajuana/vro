import { withInstall } from '@vrojs/base'

import Component from './vro-el-skeleton.vue'

export * from './types'

export const VroElSkeleton = withInstall<typeof Component>(Component)
export default VroElSkeleton

export type VroElSkeletonInstance = InstanceType<typeof VroElSkeleton>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSkeleton: typeof VroElSkeleton
  }
}
