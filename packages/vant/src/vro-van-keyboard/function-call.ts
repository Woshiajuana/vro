import { showComponent } from '@vrojs/base'
import type { UseVisibleShowOptions } from '@vrojs/use'
import { type AppContext, markRaw } from 'vue'

import VroVanWithConfig, { type VroVanWithConfigProps } from '../vro-van-with-config'
import type { VroVanKeyboardProps, VroVanKeyboardResult } from './types'
import VroVanKeyboard from './vro-van-keyboard.vue'

export type VroVanKeyboardFunctionCallProps = Partial<
  VroVanKeyboardProps & VroVanWithConfigProps & UseVisibleShowOptions
>

export function showVroVanKeyboard<T = VroVanKeyboardResult>(
  props: VroVanKeyboardFunctionCallProps = {},
  appContext: AppContext | null = null,
): Promise<T> {
  return showComponent(
    VroVanWithConfig,
    {
      ...props,
      is: markRaw(VroVanKeyboard),
    },
    {
      appContext,
      destroyHandlers: ['onClosed'],
    },
  )
}
