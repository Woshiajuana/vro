import { withInstall } from '@vrojs/base'

import Component from './vro-van-config-provider.vue'

export * from './types'

export const VroVanConfigProvider = withInstall<typeof Component>(Component)
export default VroVanConfigProvider

export type VroVanConfigProviderInstance = InstanceType<typeof VroVanConfigProvider>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanConfigProvider: typeof VroVanConfigProvider
  }
}
