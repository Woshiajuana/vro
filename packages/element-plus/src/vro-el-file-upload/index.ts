import { withInstall } from '@vrojs/base'

import Component from './vro-el-file-upload.vue'

export * from './types'
export * from './utils'

export const VroElFileUpload = withInstall<typeof Component>(Component)
export default VroElFileUpload

export type VroElFileUploadInstance = InstanceType<typeof VroElFileUpload>

declare module 'vue' {
  export interface GlobalComponents {
    VroElFileUpload: typeof VroElFileUpload
  }
}
