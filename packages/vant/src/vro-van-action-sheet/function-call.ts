import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanActionSheetProps, VroVanActionSheetResult } from './types'
import VroVanActionSheet from './vro-van-action-sheet.vue'

export type VroVanActionSheetFunctionCallProps = Partial<
  VroVanActionSheetProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanActionSheet<T = VroVanActionSheetResult>(
  props: VroVanActionSheetFunctionCallProps,
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanActionSheet),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
