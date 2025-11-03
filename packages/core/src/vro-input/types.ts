import type { ExtractPropTypes, HTMLAttributes, InputTypeHTMLAttribute } from 'vue'

import { definePropType } from '../utils'

export const vroInputProps = {
  /**
   * 类型：扩展了 decimal 类型
   * @default text
   */
  type: {
    type: definePropType<InputTypeHTMLAttribute | 'decimal'>(String),
    default: 'text',
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number, Object]),
    default: '',
  },
  /**
   * 最大值：仅当 type 为 decimal 有效
   * @default Number.MAX_SAFE_INTEGER
   */
  max: {
    type: [String, Number],
    default: Number.MAX_SAFE_INTEGER,
  },
  /**
   * 最小值：仅当 type 为 decimal 有效
   * @default Number.MIN_SAFE_INTEGER
   */
  min: {
    type: [String, Number],
    default: Number.MIN_SAFE_INTEGER,
  },
  /**
   * 输入的值如果超过最大值或小于最小值，是否自动修正：仅当 type 为 decimal 有效
   * @default false
   */
  autoFix: Boolean,
  maxlength: [String, Number],
  placeholder: String,
  disabled: Boolean,
  /**
   * 精确度：仅当 type 为 decimal 有效
   * @default 2
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
