import { withInstall } from '@vrojs/base'

import Component from './vro-el-test.vue'

export * from './types'

export const VroElTest = withInstall<typeof Component>(Component)
export default VroElTest

export type VroElTestInstance = InstanceType<typeof VroElTest>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTest: typeof VroElTest
  }
}
