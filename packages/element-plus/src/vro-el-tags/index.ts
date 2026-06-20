import { withInstall } from '@vrojs/base'

import Component from './vro-el-tags.vue'

export * from './types'

export const VroElTags = withInstall<typeof Component>(Component)
export default VroElTags

export type VroElTagsInstance = InstanceType<typeof VroElTags>

declare module 'vue' {
  export interface GlobalComponents {
    VroElTags: typeof VroElTags
  }
}
