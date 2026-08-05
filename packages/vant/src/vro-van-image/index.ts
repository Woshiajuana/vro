import { withInstall } from '@vrojs/base'

import Component from './vro-van-image.vue'

export * from './types'

export const VroVanImage = withInstall<typeof Component>(Component)
export default VroVanImage

export type VroVanImageInstance = InstanceType<typeof VroVanImage>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanImage: typeof VroVanImage
  }
}
