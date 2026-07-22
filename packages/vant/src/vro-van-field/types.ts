import { omit } from '@daysnap/utils'
import { vroInputProps, type VroSlot, type VroSlots } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanFieldCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanFieldProps = {
  // Cell props
  ...vroVanFieldCellProps,

  // Input props
  ...vroInputProps,

  // Field props
  /**
   * 是否显示清除按钮。
   */
  clearable: Boolean,

  /**
   * 输入框右侧单位。
   */
  unit: String,
}

export type VroVanFieldProps = ExtractPropTypes<typeof vroVanFieldProps>

export interface VroVanFieldSlots extends VroSlots {
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
   * 自定义输入区域后置内容，会覆盖 suffixIcon 渲染的图标。
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

export interface VroVanFieldEmits {
  /**
   * 输入值变化或清空时触发。
   */
  'update:modelValue': [value: string]

  /**
   * 输入时触发。
   */
  input: [event: InputEvent]

  /**
   * 失焦时触发。
   */
  blur: [event: FocusEvent]

  /**
   * 点击清除按钮时触发。
   */
  clear: []

  /**
   * 点击 prefixIcon 时触发。
   */
  'click-prefix-icon': [event: MouseEvent]

  /**
   * 点击 suffixIcon 时触发。
   */
  'click-suffix-icon': [event: MouseEvent]
}
