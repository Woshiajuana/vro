import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import { radioGroupProps } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export type VroVanRadioOption =
  | string
  | (Record<string, any> & {
      props?: Record<string, any>
    })

export interface VroVanRadioNormalizedOption {
  key: string | number
  label: unknown
  value: unknown
  disabled: boolean
  props: Record<string, any>
  raw: VroVanRadioOption
}

export const vroVanRadioCellProps = omit(vroVanCellProps, ['value', 'formatter'])
export const vroVanRadioGroupProps = omit(radioGroupProps, ['direction'])

export const vroVanRadioProps = {
  ...vroVanRadioCellProps,
  ...vroVanRadioGroupProps,

  /**
   * 选项列表，支持字符串数组或对象数组。
   */
  options: {
    type: Array as PropType<VroVanRadioOption[]>,
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
   * 单选框排列方向，透传给 VanRadioGroup 的 direction。
   */
  radioDirection: String as PropType<'horizontal' | 'vertical'>,
}

export type VroVanRadioProps = ExtractPropTypes<typeof vroVanRadioProps>

export interface VroVanRadioSlots {
  /**
   * 自定义单选框组内容，会覆盖 options 自动渲染的选项。
   */
  default?: VroSlot

  /**
   * 自定义单个选项内容。
   */
  option?: VroSlot
}

export interface VroVanRadioEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: unknown]

  /**
   * 选中值变化时触发。
   */
  change: [value: unknown]
}
