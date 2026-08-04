import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanDatetimePickerProps, VroVanDatetimePickerResult } from './types'
import VroVanDatetimePicker from './vro-van-datetime-picker.vue'

export type VroVanDatetimePickerFunctionCallProps = Partial<
  VroVanDatetimePickerProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanDatetimePicker<T = VroVanDatetimePickerResult>(
  props: VroVanDatetimePickerFunctionCallProps,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanDatetimePicker),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
