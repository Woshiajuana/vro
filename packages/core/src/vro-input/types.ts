import type { ExtractPropTypes, HTMLAttributes, InputTypeHTMLAttribute } from 'vue'

import { definePropType } from '../utils'

export const vroInputProps = {
  /**
   * 类型
   * 1. decimal 为扩展类型
   */
  type: {
    type: definePropType<InputTypeHTMLAttribute | 'decimal'>(String),
    default: 'text',
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number, Object]),
    default: '',
  },
  max: [String, Number],
  min: [String, Number],
  maxlength: [String, Number],
  placeholder: String,
  disabled: Boolean,
  /**
   * 精确度：仅当 type 为 decimal 有效
   */
  precision: {
    type: [String, Number],
    default: 2,
  },
  /**
   * 扩展
   */
  pattern: definePropType<(value: string, preValue: string) => string>(Function),
  id: String,
  name: String,
  readonly: Boolean,
  inputmode: definePropType<HTMLAttributes['inputmode']>(String),
}

export type VroInputProps = ExtractPropTypes<typeof vroInputProps>
