import { withInstall } from '@vrojs/base'

import Component from './vro-el-image.vue'

export * from './types'
export * from './utils'

export const VroElImage = withInstall<typeof Component>(Component)
export default VroElImage

export type VroElImageInstance = InstanceType<typeof VroElImage>

declare module 'vue' {
  export interface GlobalComponents {
    VroElImage: typeof VroElImage
  }
}
