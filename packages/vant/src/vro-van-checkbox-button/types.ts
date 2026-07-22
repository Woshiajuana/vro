import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanCellProps } from '../vro-van-cell'

export type VroVanCheckboxButtonOption =
  | string
  | (Record<string, any> & {
      props?: Record<string, any>
    })

export interface VroVanCheckboxButtonNormalizedOption {
  key: string | number
  label: unknown
  value: unknown
  disabled: boolean
  checked: boolean
  props: Record<string, any>
  raw: VroVanCheckboxButtonOption
}

export const vroVanCheckboxButtonCellProps = omit(vroVanCellProps, ['value', 'formatter'])

export const vroVanCheckboxButtonProps = {
  ...vroVanCheckboxButtonCellProps,

  /**
   * 当前选中的值。
   */
  modelValue: {
    type: Array as PropType<unknown[]>,
    default: () => [],
  },

  /**
   * 选项列表，支持字符串数组或对象数组。
   */
  options: {
    type: Array as PropType<VroVanCheckboxButtonOption[]>,
    default: () => [],
  },

  /**
   * 是否禁用全部选项。
   */
  disabled: Boolean,

  /**
   * 最多可选数量。
   */
  max: Number,

  /**
   * 每行展示的列数。
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

export type VroVanCheckboxButtonProps = ExtractPropTypes<typeof vroVanCheckboxButtonProps>

export interface VroVanCheckboxButtonSlots {
  /**
   * 自定义选项内容。
   */
  option?: VroSlot
}

export interface VroVanCheckboxButtonEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: unknown[]]

  /**
   * 选中值变化时触发。
   */
  change: [value: unknown[]]
}
