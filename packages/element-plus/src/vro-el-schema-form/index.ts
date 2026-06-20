import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-form.vue'

export * from './types'

export const VroElSchemaForm = withInstall<typeof Component>(Component)
export default VroElSchemaForm

export type VroElSchemaFormInstance = InstanceType<typeof VroElSchemaForm>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaForm: typeof VroElSchemaForm
  }
}
