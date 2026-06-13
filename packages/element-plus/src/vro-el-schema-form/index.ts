import { withInstall } from '@vrojs/core'

import Component from './vro-el-schema-form.vue'

export * from './defineVroElSchemaFormCreateField'
export * from './defineVroElSchemaFormFieldTrigger'
export * from './types'
export * from './useVroElSchemaForm'
export * from './vroElSchemaFormFieldManager'

export const VroElSchemaForm = withInstall<typeof Component>(Component)
export default VroElSchemaForm

export type VroElSchemaFormInstance = InstanceType<typeof VroElSchemaForm>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaForm: typeof VroElSchemaForm
  }
}
