import { omit } from '@daysnap/utils'
import { vroInputProps } from '@vrojs/base'
import { vroVanCellProps } from 'src/vro-van-cell'
import type { ExtractPropTypes } from 'vue'

export const vroVanCellInFieldProps = omit(vroVanCellProps, ['value'])

export const vroVanFieldProps = {
  ...vroVanCellInFieldProps,
  ...vroInputProps,
}

export type VroVanFieldProps = ExtractPropTypes<typeof vroVanFieldProps>
