import { showComponent } from '@vrojs/base'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanPickerProps, VroVanPickerResult } from './types'
import VroVanPicker from './vro-van-picker.vue'

export function showVroVanPicker<T = VroVanPickerResult>(
  props: Partial<VroVanPickerProps & VroVanWithConfigProps>,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanPicker),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
