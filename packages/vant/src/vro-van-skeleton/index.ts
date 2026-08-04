import { withInstall } from '@vrojs/base'

import Component from './vro-van-skeleton.vue'

export * from './types'

export const VroVanSkeleton = withInstall<typeof Component>(Component)
export default VroVanSkeleton

export type VroVanSkeletonInstance = InstanceType<typeof VroVanSkeleton>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanSkeleton: typeof VroVanSkeleton
  }
}
