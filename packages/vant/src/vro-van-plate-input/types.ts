import type { ExtractPropTypes } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanPlateInputProps = {
  ...vroVanCellProps,

  modelValue: {
    type: String,
    default: '',
  },
  placeholder: String,
}

export type VroVanPlateInputProps = ExtractPropTypes<typeof vroVanPlateInputProps>
