import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export type VroVanRadioButtonOption =
  | string
  | (Record<string, any> & {
      props?: Record<string, any>
    })

export interface VroVanRadioButtonNormalizedOption {
  key: string | number
  label: unknown
  value: unknown
  disabled: boolean
  checked: boolean
  props: Record<string, any>
  raw: VroVanRadioButtonOption
}

export const vroVanRadioButtonCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanRadioButtonProps = {
  ...vroVanRadioButtonCellProps,

  /**
   * 当前选中的值。
   */
  modelValue: null as unknown as PropType<unknown>,

  /**
   * 选项列表，支持字符串数组或对象数组。
   */
  options: {
    type: Array as PropType<VroVanRadioButtonOption[]>,
    default: () => [],
  },

  /**
   * 是否禁用全部选项。
   */
  disabled: Boolean,

  /**
   * 每行展示的列数，仅 direction 为 column 时生效。
   */
  columns: Number,

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
}

export type VroVanRadioButtonProps = ExtractPropTypes<typeof vroVanRadioButtonProps>

export interface VroVanRadioButtonSlots {
  /**
   * 自定义选项内容。
   */
  option?: VroSlot
}

export interface VroVanRadioButtonEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: unknown]

  /**
   * 选中值变化时触发。
   */
  change: [value: unknown]
}
