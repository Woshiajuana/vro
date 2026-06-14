import { withInstall } from '@vrojs/base'

import Component from './vro-el-image-upload.vue'

export * from './types'
export * from './utils'

export const VroElImageUpload = withInstall<typeof Component>(Component)
export default VroElImageUpload

export type VroElImageUploadInstance = InstanceType<typeof VroElImageUpload>

declare module 'vue' {
  export interface GlobalComponents {
    VroElImageUpload: typeof VroElImageUpload
  }
}
