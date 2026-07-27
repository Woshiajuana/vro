import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-form-drawer.vue'

export * from './function-call'
export * from './injection'
export * from './types'
export * from './useVroElSchemaFormDrawer'

export const VroElSchemaFormDrawer = withInstall<typeof Component>(Component)
export default VroElSchemaFormDrawer

export type VroElSchemaFormDrawerInstance = InstanceType<typeof VroElSchemaFormDrawer>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaFormDrawer: typeof VroElSchemaFormDrawer
  }
}
