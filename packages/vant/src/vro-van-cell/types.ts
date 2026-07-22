import type { VroSlot, VroSlots } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanIconProps } from '../vro-van-icon'

export type VroVanCellDirection = 'row' | 'column'

export const vroVanCellProps = {
  // Content props
  /**
   * 左侧标题内容。
   */
  label: String,

  /**
   * 右侧内容。
   */
  value: [String, Number] as PropType<string | number>,

  /**
   * 右侧内容格式化函数。
   */
  formatter: {
    default: (v: any) => v,
    type: Function as PropType<(v: any) => any>,
  },

  // Layout props
  /**
   * 内容排列方向。
   *
   * @default row
   */
  direction: {
    type: String as PropType<VroVanCellDirection>,
    default: 'row',
  },

  /**
   * 是否垂直居中。
   */
  alignItemCenter: Boolean,

  // Status props
  /**
   * 是否显示必填星号。
   */
  required: Boolean,

  /**
   * 是否隐藏必填星号，仅在 required 为 true 时生效。
   */
  noAsterisk: Boolean,

  // Action props
  /**
   * 是否显示右侧箭头。
   */
  arrow: Boolean,

  /**
   * 是否展示点击态。
   */
  clickable: Boolean,

  // Text overflow props
  /**
   * 是否单行省略右侧内容。
   */
  ellipsis: Boolean,

  /**
   * 右侧内容最大显示行数，设置后超出内容会省略。
   */
  lineClamp: [String, Number] as PropType<string | number>,

  // Icon props
  /**
   * 左侧图标属性，透传给 VroVanIcon。
   */
  iconProps: Object as PropType<Partial<VroVanIconProps>>,
}

export type VroVanCellProps = ExtractPropTypes<typeof vroVanCellProps>

export interface VroVanCellSlots extends VroSlots {
  /**
   * 自定义右侧内容。
   */
  default?: VroSlot

  /**
   * 自定义最前置内容。
   */
  before?: VroSlot

  /**
   * 自定义标题前置内容，会覆盖 iconProps 渲染的图标。
   */
  prefix?: VroSlot

  /**
   * 自定义 iconProps 图标的默认插槽内容。
   */
  'icon-default'?: VroSlot

  /**
   * 自定义标题内容。
   */
  label?: VroSlot

  /**
   * 自定义右侧后置内容，会覆盖 arrow 渲染的箭头。
   */
  suffix?: VroSlot

  /**
   * 自定义最后置内容。
   */
  after?: VroSlot
}
