import type { VroSlot } from '@vrojs/base'
import { dividerProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'

export const vroElDividerProps = {
  ...dividerProps,

  /**
   * 分割线内容，默认插槽优先级更高。
   */
  content: {
    type: String,
    default: '',
  },
}

export type VroElDividerProps = ExtractPropTypes<typeof vroElDividerProps>

export interface VroElDividerSlots {
  /**
   * 自定义分割线内容，优先级高于 content。
   */
  default?: VroSlot
}
