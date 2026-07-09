import { withInstall } from '../utils'
import Component from './vro-config-provider.vue'

export * from './types'

export const VroConfigProvider = withInstall<typeof Component>(Component)
export default VroConfigProvider

export type VroConfigProviderInstance = InstanceType<typeof VroConfigProvider>

declare module 'vue' {
  export interface GlobalComponents {
    VroConfigProvider: typeof VroConfigProvider
  }
}
