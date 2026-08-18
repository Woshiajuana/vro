import type { ExtractPropTypes } from 'vue'

import type { VroSlot } from '../types'

export const vroSafeAreaProps = {
  /**
   * 是否适配顶部安全区。
   */
  top: Boolean,

  /**
   * 是否适配底部安全区。
   */
  bottom: Boolean,

  /**
   * 是否适配左侧安全区。
   */
  left: Boolean,

  /**
   * 是否适配右侧安全区。
   */
  right: Boolean,
}

export type VroSafeAreaProps = ExtractPropTypes<typeof vroSafeAreaProps>

export interface VroSafeAreaSlots {
  /**
   * 默认内容。
   */
  default?: VroSlot
}
