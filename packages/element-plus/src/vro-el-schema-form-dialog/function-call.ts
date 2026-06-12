import { showComponent } from '@vrojs/base'
import { AppContext } from 'vue'

import { VroElSchemaFormDialogProps } from './types'
import VroElSchemaFormDialog from './vro-el-schema-form-dialog.vue'

export function showVroElSchemaFormDialog<T = any>(
  props: Partial<VroElSchemaFormDialogProps>,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(VroElSchemaFormDialog, props, appContext)
}
