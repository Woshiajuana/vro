import { omit } from '@daysnap/utils'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps, type VroVanCellSlots } from '../vro-van-cell'
import type { VroVanKeyboardProps } from '../vro-van-keyboard'
import type { VroVanPlatePickerProps } from '../vro-van-plate-picker'

export const vroVanPlateInputCellProps = omit(vroVanCellProps, [
  'value',
  'formatter',
  'arrow',
  'clickable',
])

export const vroVanPlateInputProps = {
  ...vroVanPlateInputCellProps,

  /**
   * 当前车牌号。
   */
  modelValue: {
    type: String,
    default: '',
  },

  /**
   * 未输入车牌号时的占位内容。
   */
  placeholder: String,

  /**
   * 车牌后缀最大长度。
   *
   * @default 8
   */
  maxlength: {
    type: [Number, String] as PropType<number | string>,
    default: 8,
  },

  /**
   * 是否禁用。
   */
  disabled: Boolean,

  /**
   * 是否只读。
   */
  readonly: Boolean,

  /**
   * 是否显示清除按钮。
   */
  clearable: Boolean,

  /**
   * 是否展示点击态。
   *
   * @default true
   */
  clickable: {
    type: Boolean,
    default: true,
  },

  /**
   * 车牌前缀选择器属性配置。
   */
  platePickerProps: Object as PropType<Partial<VroVanPlatePickerProps>>,

  /**
   * 键盘属性配置。
   */
  keyboardProps: Object as PropType<Partial<VroVanKeyboardProps>>,
}

export type VroVanPlateInputProps = ExtractPropTypes<typeof vroVanPlateInputProps>

export interface VroVanPlateInputSlots extends Omit<VroVanCellSlots, 'default'> {}

export interface VroVanPlateInputEmits {
  /**
   * 车牌号变化时触发。
   */
  'update:modelValue': [value: string]

  /**
   * 车牌号变化时触发。
   */
  change: [value: string]

  /**
   * 点击清除按钮时触发。
   */
  clear: []
}
