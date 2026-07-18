import { withInstall } from '@vrojs/base'

import Component from './vro-van-field.vue'

export * from './types'

export const VroVanField = withInstall<typeof Component>(Component)
export default VroVanField

export type VroVanFieldInstance = InstanceType<typeof VroVanField>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanField: typeof VroVanField
  }
}
