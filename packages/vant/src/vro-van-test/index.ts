import { withInstall } from '@vrojs/base'

import Component from './vro-van-test.vue'

export * from './types'

export const VroVanTest = withInstall<typeof Component>(Component)
export default VroVanTest

export type VroVanTestInstance = InstanceType<typeof VroVanTest>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanTest: typeof VroVanTest
  }
}
