import { checkboxGroupProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElCheckboxGroupProps = {
  ...checkboxGroupProps,

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

export type VroElCheckboxGroupProps = ExtractPropTypes<typeof vroElCheckboxGroupProps>
