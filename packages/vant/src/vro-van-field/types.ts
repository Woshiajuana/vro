import { omit } from '@daysnap/utils'
import { vroInputProps } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

import { type VroVanCellEmits, vroVanCellProps, type VroVanCellSlots } from '../vro-van-cell'

export const vroVanFieldCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanFieldProps = {
  ...vroVanFieldCellProps,

  ...vroInputProps,

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

export interface VroVanFieldSlots extends Omit<VroVanCellSlots, 'default'> {}

export interface VroVanFieldEmits extends VroVanCellEmits {
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
}
