import { withInstall } from '@vrojs/base'

import Component from './vro-van-schema-form.vue'

export * from './types'

export const VroVanSchemaForm = withInstall<typeof Component>(Component)
export default VroVanSchemaForm

export type VroVanSchemaFormInstance = InstanceType<typeof VroVanSchemaForm>

declare module 'vue' {
  export interface GlobalComponents {
    VroVanSchemaForm: typeof VroVanSchemaForm
  }
}
