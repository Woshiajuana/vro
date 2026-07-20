import { omit } from '@daysnap/utils'
import { vroInputProps } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export const vroVanFieldCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanFieldProps = {
  ...vroVanFieldCellProps,
  ...vroInputProps,
  /**
   * 是否显示清除按钮。
   */
  clearable: Boolean,

  /**
   * 输入框右侧单位。
   */
  unit: String,
}

export type VroVanFieldProps = ExtractPropTypes<typeof vroVanFieldProps>
