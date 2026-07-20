import { omit } from '@daysnap/utils'
import { vroInputProps } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanFieldCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanFieldProps = {
  ...vroVanFieldCellProps,
  ...vroInputProps,
  clearable: Boolean,
  unit: String,
}

export type VroVanFieldProps = ExtractPropTypes<typeof vroVanFieldProps>
