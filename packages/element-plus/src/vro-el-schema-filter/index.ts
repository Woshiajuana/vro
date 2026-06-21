import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-filter.vue'

export * from './types'

export const VroElSchemaFilter = withInstall<typeof Component>(Component)
export default VroElSchemaFilter

export type VroElSchemaFilterInstance = InstanceType<typeof VroElSchemaFilter>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaFilter: typeof VroElSchemaFilter
  }
}
