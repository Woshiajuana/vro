import { selectProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElSelectProps = {
  ...selectProps,

  options: Array as PropType<any[]>,
  labelKey: {
    type: String,
    default: 'label',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
}

export type VroElSelectProps = ExtractPropTypes<typeof vroElSelectProps>
