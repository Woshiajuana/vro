import type { VroSlot } from '@vrojs/base'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

/**
 * 分割线线条样式。
 */
export type VroElDividerBorderStyle = CSSProperties['borderStyle']

export const vroElDividerProps = {
  /**
   * 分割线方向。
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  /**
   * 内容在分割线上的位置。
   */
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },

  /**
   * 线条样式。
   */
  borderStyle: {
    type: String as PropType<VroElDividerBorderStyle>,
    default: 'solid',
  },

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
