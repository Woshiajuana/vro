import { withInstall } from '@vrojs/base'

import Component from './vro-van-textarea.vue'

export * from './types'

export const VroVanTextarea = withInstall<typeof Component>(Component)
export default VroVanTextarea

export type VroVanTextareaInstance = InstanceType<typeof VroVanTextarea>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanTextarea: typeof VroVanTextarea
  }
}
