import { withInstall } from '../utils'
import Component from './vro-vnr.vue'

export * from './types'

export const VroVnr = withInstall<typeof Component>(Component)
export default VroVnr

export type VroVnrInstance = InstanceType<typeof VroVnr>

declare module 'vue' {
  export interface GlobalComponents {
    VroVnr: typeof VroVnr
  }
}
