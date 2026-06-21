import { radioGroupProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElRadioGroupProps = {
  ...radioGroupProps,

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

export type VroElRadioGroupProps = ExtractPropTypes<typeof vroElRadioGroupProps>
