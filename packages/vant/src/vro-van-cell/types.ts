import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanIconProps } from '../vro-van-icon'

export type VroVanCellDirection = 'row' | 'column'

export const vroVanCellProps = {
  label: String,
  value: String,
  direction: {
    type: String as PropType<VroVanCellDirection>,
    default: 'row',
  },
  arrow: Boolean,
  required: Boolean,
  ellipsis: Boolean,
  lineClamp: [String, Number] as PropType<string | number>,
  iconProps: Object as PropType<VroVanIconProps>,
}

export type VroVanCellProps = ExtractPropTypes<typeof vroVanCellProps>
