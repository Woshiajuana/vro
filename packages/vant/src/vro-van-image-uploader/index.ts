import { withInstall } from '@vrojs/base'

import Component from './vro-van-image-uploader.vue'

export * from './types'

export const VroVanImageUploader = withInstall<typeof Component>(Component)
export default VroVanImageUploader

export type VroVanImageUploaderInstance = InstanceType<typeof VroVanImageUploader>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanImageUploader: typeof VroVanImageUploader
  }
}
