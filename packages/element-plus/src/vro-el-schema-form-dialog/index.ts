import { withInstall } from '@vrojs/base'

import Component from './vro-el-schema-form-dialog.vue'

export * from './function-call'
export * from './injection'
export * from './types'
export * from './useVroElSchemaFormDialog'

export const VroElSchemaFormDialog = withInstall<typeof Component>(Component, (app) => {
  app.component((Component as any).name, Component)
  ;(Component as any)._context = app._context
})
export default VroElSchemaFormDialog

export type VroElSchemaFormDialogInstance = InstanceType<typeof VroElSchemaFormDialog>

declare module 'vue' {
  export interface GlobalComponents {
    VroElSchemaFormDialog: typeof VroElSchemaFormDialog
  }
}
