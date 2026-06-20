import { showComponent } from '@vrojs/base'
import { type AppContext } from 'vue'

import { type VroElSchemaFormDialogProps } from './types'
import VroElSchemaFormDialog from './vro-el-schema-form-dialog.vue'

export function showVroElSchemaFormDialog<T = any>(
  props: Partial<VroElSchemaFormDialogProps>,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(VroElSchemaFormDialog, props, appContext)
}
