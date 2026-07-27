import { showComponent } from '@vrojs/base'
import { type AppContext, markRaw } from 'vue'

import VroElWithConfig, { type VroElWithConfigProps } from '../vro-el-with-config'
import type { VroElSchemaFormDrawerProps } from './types'
import VroElSchemaFormDrawer from './vro-el-schema-form-drawer.vue'

export function showVroElSchemaFormDrawer<T = any>(
  props: Partial<VroElSchemaFormDrawerProps & VroElWithConfigProps>,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroElWithConfig,
    {
      ...props,
      is: markRaw(VroElSchemaFormDrawer),
    },
    appContext,
  )
}
