import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-form-dialog.vue'

export * from './function-call'
export * from './types'

export const VroElSchemaFormDialog = withInstall<typeof Component>(Component)
export default VroElSchemaFormDialog

export type VroElSchemaFormDialogInstance = InstanceType<typeof VroElSchemaFormDialog>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaFormDialog: typeof VroElSchemaFormDialog
  }
}
