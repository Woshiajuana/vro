import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanIconProps } from '../vro-van-icon'

export type VroVanCellDirection = 'row' | 'column'
export type VroVanCellIcon = string | Partial<VroVanIconProps>

export const vroVanCellProps = {
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

  /**
   * 是否显示必填星号。
   */
  required: Boolean,

  /**
   * 是否隐藏必填星号，仅在 required 为 true 时生效。
   */
  noAsterisk: Boolean,

  /**
   * 是否显示右侧箭头。
   */
  arrow: Boolean,

  /**
   * 是否展示点击态。
   */
  clickable: Boolean,

  /**
   * 是否单行省略右侧内容。
   */
  ellipsis: Boolean,

  /**
   * 右侧内容最大显示行数，设置后超出内容会省略。
   */
  lineClamp: [String, Number] as PropType<string | number>,

  /**
   * 标题前置图标。传入字符串时作为 VroVanIcon 的 name 使用，传入对象时透传给 VroVanIcon。
   */
  prefixIcon: [String, Object] as PropType<VroVanCellIcon>,

  /**
   * 右侧后置图标。传入字符串时作为 VroVanIcon 的 name 使用，传入对象时透传给 VroVanIcon。
   */
  suffixIcon: [String, Object] as PropType<VroVanCellIcon>,
}

export type VroVanCellProps = ExtractPropTypes<typeof vroVanCellProps>

export interface VroVanCellSlots {
  /**
   * 自定义右侧内容。
   */
  default?: VroSlot

  /**
   * 自定义整体前置内容。
   */
  prepend?: VroSlot

  /**
   * 自定义标题前置内容，会覆盖 prefixIcon 渲染的图标。
   */
  prefix?: VroSlot

  /**
   * 自定义 prefixIcon 图标的默认插槽内容。
   */
  'prefix-icon-default'?: VroSlot

  /**
   * 自定义标题内容。
   */
  label?: VroSlot

  /**
   * 自定义右侧后置内容，会覆盖 suffixIcon 渲染的图标。
   */
  suffix?: VroSlot

  /**
   * 自定义 suffixIcon 图标的默认插槽内容。
   */
  'suffix-icon-default'?: VroSlot

  /**
   * 自定义整体后置内容。
   */
  append?: VroSlot
}

export interface VroVanCellEmits {
  /**
   * 点击 prefixIcon 时触发。
   */
  'click-prefix-icon': [event: MouseEvent]

  /**
   * 点击 suffixIcon 时触发。
   */
  'click-suffix-icon': [event: MouseEvent]
}
