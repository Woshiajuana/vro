import { omit } from '@daysnap/utils'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanCheckboxCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanCheckboxButtonProps = {
  ...vroVanCheckboxCellProps,

  options: Array as PropType<
    | string
    | (Record<string, any> & {
        props?: Record<string, any>
      })
  >,

  disabled: Boolean,

  max: Number,

  labelKey: {
    type: String,
    default: 'label',
  },

  valueKey: {
    type: String,
    default: 'value',
  },
}

export type VroVanCheckboxButtonProps = ExtractPropTypes<typeof vroVanCheckboxButtonProps>
