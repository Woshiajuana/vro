import type { ExtractPropTypes, PropType } from 'vue'

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
}

export type VroVanCellProps = ExtractPropTypes<typeof vroVanCellProps>
