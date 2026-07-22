import { omit } from '@daysnap/utils'
import { vroVanCellProps } from 'src/vro-van-cell'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanFieldCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanCheckboxProps = {
  ...vroVanFieldCellProps,

  disabled: Boolean,
  max: Number,
  labelKey: String,
  valueKey: String,
  modelValue: Array as PropType<unknown[]>,
  options: Array as PropType<string[] | Record<string, any>[]>,
}

export type VroVanCheckboxProps = ExtractPropTypes<typeof vroVanCheckboxProps>
