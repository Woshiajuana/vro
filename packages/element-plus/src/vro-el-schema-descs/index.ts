import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-descs.vue'

export * from './types'

export const VroElSchemaDescs = withInstall<typeof Component>(Component)
export default VroElSchemaDescs

export type VroElSchemaDescsInstance = InstanceType<typeof VroElSchemaDescs>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaDescs: typeof VroElSchemaDescs
  }
}
