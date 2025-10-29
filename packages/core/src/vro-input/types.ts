import type { ExtractPropTypes, HTMLAttributes } from 'vue'

import { definePropType } from '../utils'

export const vroInputProps = {
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number, Object]),
    default: '',
  },
  maxlength: [String, Number],
  placeholder: String,
  disabled: Boolean,
  fractionDigits: {
    type: [String, Number],
    default: 2,
  },
  pattern: definePropType<((value: string, preValue: string) => string) | RegExp>([
    Function,
    RegExp,
  ]),
  name: String,
  readonly: Boolean,
  inputmode: definePropType<HTMLAttributes['inputmode']>(String),
}

export type VroInputProps = ExtractPropTypes<typeof vroInputProps>
