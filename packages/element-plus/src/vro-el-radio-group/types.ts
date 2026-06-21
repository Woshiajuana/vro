import { radioGroupProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export const vroElRadioGroupProps = {
  ...radioGroupProps,

  /**
   * 选项列表，支持基础值或对象配置。
   */
  options: Array as PropType<any[]>,

  /**
   * 选项展示文本的字段名。
   */
  labelKey: {
    type: String,
    default: 'label',
  },

  /**
   * 选项绑定值的字段名。
   */
  valueKey: {
    type: String,
    default: 'value',
  },
}

export type VroElRadioGroupProps = ExtractPropTypes<typeof vroElRadioGroupProps>
