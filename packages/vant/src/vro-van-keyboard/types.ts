import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanKeyboardProps = {
  ...vroVanCellProps,
  value: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'text' | 'vin' | 'plate'>,
    default: 'text',
  },
  maxlength: [Number, String],
  placeholder: String,
  disabledKeys: Array as PropType<string[]>,
  onPaste: Function as PropType<() => string | Promise<string>>,
}

export type VroVanKeyboardProps = ExtractPropTypes<typeof vroVanKeyboardProps>
