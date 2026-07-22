import { omit } from '@daysnap/utils'
import { definePropType } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

import { type VroVanCellEmits, vroVanCellProps, type VroVanCellSlots } from '../vro-van-cell'

export interface VroVanTextareaAutosize {
  minRows?: number
  maxRows?: number
}

export const vroVanTextareaCellProps = omit(vroVanCellProps, ['value', 'formatter', 'direction'])

export const vroVanTextareaInputProps = {
  /**
   * 文本域绑定值。
   */
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number]),
    default: '',
  },

  /**
   * 原生 maxlength 属性。
   */
  maxlength: [String, Number],

  /**
   * 原生 placeholder 属性。
   */
  placeholder: String,

  /**
   * 原生 disabled 属性。
   */
  disabled: Boolean,

  /**
   * 原生 readonly 属性。
   */
  readonly: Boolean,

  /**
   * 原生 id 属性。未传入时会自动生成一个 id。
   */
  id: String,

  /**
   * 原生 name 属性。
   */
  name: String,

  /**
   * 原生 rows 属性。
   *
   * @default 3
   */
  rows: {
    type: [String, Number],
    default: 3,
  },

  /**
   * 是否自适应内容高度，也可传入最小/最大行数配置。
   */
  autosize: [Boolean, Object] as any as ReturnType<
    typeof definePropType<boolean | VroVanTextareaAutosize>
  >,

  /**
   * 是否显示字数统计，需要配合 maxlength 使用。
   */
  showWordLimit: Boolean,
}

export const vroVanTextareaProps = {
  ...vroVanTextareaCellProps,

  ...vroVanTextareaInputProps,
}

export type VroVanTextareaProps = ExtractPropTypes<typeof vroVanTextareaProps>

export interface VroVanTextareaSlots extends Omit<VroVanCellSlots, 'default'> {}

export interface VroVanTextareaEmits extends VroVanCellEmits {
  /**
   * 输入值变化时触发。
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
}
