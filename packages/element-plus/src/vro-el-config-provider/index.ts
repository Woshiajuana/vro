import { withInstall } from '@vrojs/base'

import Component from './vro-el-config-provider.vue'

export * from './types'

export const VroElConfigProvider = withInstall<typeof Component>(Component)
export default VroElConfigProvider

export type VroElConfigProviderInstance = InstanceType<typeof VroElConfigProvider>

declare module 'vue' {
  export interface GlobalComponents {
    VroElConfigProvider: typeof VroElConfigProvider
  }
}
