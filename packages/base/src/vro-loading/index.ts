import { withInstall } from '../utils'
import Component from './vro-loading.vue'

export * from './types'

export const VroLoading = withInstall<typeof Component>(Component)
export default VroLoading

export type VroLoadingInstance = InstanceType<typeof VroLoading>

declare module 'vue' {
  export interface GlobalComponents {
    VroLoading: typeof VroLoading
  }
}
