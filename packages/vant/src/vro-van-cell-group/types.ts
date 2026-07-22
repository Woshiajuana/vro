import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

export const vroVanCellGroupProps = {
  /**
   * 分组标题。
   */
  title: String,

  /**
   * 是否展示为圆角卡片风格。
   */
  inset: Boolean,

  /**
   * 是否显示上下边框。
   *
   * @default true
   */
  border: {
    type: Boolean,
    default: true,
  },
}

export type VroVanCellGroupProps = ExtractPropTypes<typeof vroVanCellGroupProps>

export interface VroVanCellGroupSlots {
  /**
   * 自定义分组内容。
   */
  default?: VroSlot

  /**
   * 自定义分组标题。
   */
  title?: VroSlot
}
