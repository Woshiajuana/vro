import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import { checkboxGroupProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export type VroVanCheckboxOption =
  | string
  | (Record<string, any> & {
      props?: Record<string, any>
    })

export interface VroVanCheckboxNormalizedOption {
  key: string | number
  label: unknown
  value: unknown
  disabled: boolean
  props: Record<string, any>
  raw: VroVanCheckboxOption
}

export const vroVanCheckboxCellProps = omit(vroVanCellProps, ['value', 'formatter'])
export const vroVanCheckboxGroupProps = omit(checkboxGroupProps, ['direction'])

export const vroVanCheckboxProps = {
  ...vroVanCheckboxCellProps,
  ...vroVanCheckboxGroupProps,

  /**
   * 选项列表，支持字符串数组或对象数组。
   */
  options: {
    type: Array as PropType<VroVanCheckboxOption[]>,
    default: () => [],
  },

  /**
   * 选项文本字段名，仅 options 为对象数组时生效。
   *
   * @default label
   */
  labelKey: {
    type: String,
    default: 'label',
  },

  /**
   * 选项值字段名，仅 options 为对象数组时生效。
   *
   * @default value
   */
  valueKey: {
    type: String,
    default: 'value',
  },

  /**
   * 复选框排列方向，透传给 VanCheckboxGroup 的 direction。
   */
  checkboxDirection: String as PropType<'horizontal' | 'vertical'>,
}

export type VroVanCheckboxProps = ExtractPropTypes<typeof vroVanCheckboxProps>

export interface VroVanCheckboxSlots {
  /**
   * 自定义复选框组内容，会覆盖 options 自动渲染的选项。
   */
  default?: VroSlot

  /**
   * 自定义单个选项内容。
   */
  option?: VroSlot
}

export interface VroVanCheckboxEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: unknown[]]

  /**
   * 选中值变化时触发。
   */
  change: [value: unknown[]]
}
