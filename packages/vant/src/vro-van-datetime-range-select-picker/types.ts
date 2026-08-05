import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import {
  vroVanDatetimePickerProps,
  type VroVanDatetimePickerResult,
} from '../vro-van-datetime-picker'
import {
  type VroVanTriggerCellEmits,
  vroVanTriggerCellProps,
  type VroVanTriggerCellSlots,
} from '../vro-van-trigger-cell'

export type VroVanDatetimeRangeSelectPickerValue = string | number | Date
export type VroVanDatetimeRangeSelectPickerModelValue = [
  VroVanDatetimeRangeSelectPickerValue?,
  VroVanDatetimeRangeSelectPickerValue?,
]
export type VroVanDatetimeRangeSelectPickerValueType = 'date' | 'string'
export type VroVanDatetimeRangeSelectPickerType = 'start' | 'end'

export interface VroVanDatetimeRangeSelectPickerResult {
  type: VroVanDatetimeRangeSelectPickerType
  value: VroVanDatetimeRangeSelectPickerModelValue
  result: VroVanDatetimePickerResult
}

export const vroVanDatetimeRangeSelectPickerPickerProps = omit(vroVanDatetimePickerProps, [
  'modelValue',
  'title',
])
export const vroVanDatetimeRangeSelectPickerTriggerCellProps = omit(vroVanTriggerCellProps, [
  'modelValue',
  'placeholder',
  'formatter',
])

export const vroVanDatetimeRangeSelectPickerProps = {
  ...vroVanDatetimeRangeSelectPickerTriggerCellProps,

  ...vroVanDatetimeRangeSelectPickerPickerProps,

  /**
   * 当前选中日期时间范围。
   */
  modelValue: Array as unknown as PropType<VroVanDatetimeRangeSelectPickerModelValue>,

  /**
   * 开始日期时间选择器标题。
   */
  startTitle: String,

  /**
   * 结束日期时间选择器标题。
   */
  endTitle: String,

  /**
   * 开始日期时间占位内容。
   */
  startPlaceholder: String,

  /**
   * 结束日期时间占位内容。
   */
  endPlaceholder: String,

  /**
   * 开始和结束日期时间之间的分隔内容。
   *
   * @default '-'
   */
  separator: {
    type: String,
    default: '-',
  },

  /**
   * 选中值类型。string 返回格式化字符串，date 返回 Date 对象。
   *
   * @default 'string'
   */
  valueType: {
    type: String as PropType<VroVanDatetimeRangeSelectPickerValueType>,
    default: 'string',
  },

  /**
   * 清空时回填的值。
   */
  emptyValue: {
    type: Array as unknown as PropType<VroVanDatetimeRangeSelectPickerModelValue>,
    default: () => [],
  },
}

export type VroVanDatetimeRangeSelectPickerProps = ExtractPropTypes<
  typeof vroVanDatetimeRangeSelectPickerProps
>

export interface VroVanDatetimeRangeSelectPickerSlots extends VroVanTriggerCellSlots {
  /**
   * 自定义开始日期时间内容。
   */
  start?: VroSlot

  /**
   * 自定义结束日期时间内容。
   */
  end?: VroSlot

  /**
   * 自定义分隔内容。
   */
  separator?: VroSlot
}

export interface VroVanDatetimeRangeSelectPickerEmits extends VroVanTriggerCellEmits {
  /**
   * 确认选择或清空值时触发。
   */
  'update:modelValue': [value: VroVanDatetimeRangeSelectPickerModelValue]

  /**
   * 确认选择或清空值时触发。
   */
  change: [
    value: VroVanDatetimeRangeSelectPickerModelValue,
    result?: VroVanDatetimeRangeSelectPickerResult,
  ]
}
