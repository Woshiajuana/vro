import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanPlatePickerProps, VroVanPlatePickerResult } from './types'
import VroVanPlatePicker from './vro-van-plate-picker.vue'

export type VroVanPlatePickerFunctionCallProps = Partial<
  VroVanPlatePickerProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanPlatePicker<T = VroVanPlatePickerResult>(
  props: VroVanPlatePickerFunctionCallProps = {},
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanPlatePicker),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
