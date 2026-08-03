import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanPickerProps, VroVanPickerResult } from './types'
import VroVanPicker from './vro-van-picker.vue'

export type VroVanPickerFunctionCallProps = Partial<
  VroVanPickerProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanPicker<T = VroVanPickerResult>(
  props: VroVanPickerFunctionCallProps,
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
