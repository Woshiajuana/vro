import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanDateTimePickerProps, VroVanDateTimePickerResult } from './types'
import VroVanDateTimePicker from './vro-van-date-time-picker.vue'

export type VroVanDateTimePickerFunctionCallProps = Partial<
  VroVanDateTimePickerProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanDateTimePicker<T = VroVanDateTimePickerResult>(
  props: VroVanDateTimePickerFunctionCallProps,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanDateTimePicker),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
