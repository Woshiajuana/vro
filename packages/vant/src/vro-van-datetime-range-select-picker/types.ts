import { omit } from '@daysnap/utils'
import type { VroSlot } from '@vrojs/base'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanCellSlots } from '../vro-van-cell'
import { vroVanDatetimePickerProps } from '../vro-van-datetime-picker'
import { type VroVanTriggerCellEmits, vroVanTriggerCellProps } from '../vro-van-trigger-cell'

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
  modelValue: Array as unknown as PropType<[string?, string?]>,

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
   * 清空时回填的值。
   */
  emptyValue: {
    type: Array as unknown as PropType<[string?, string?]>,
    default: () => [],
  },
}

export type VroVanDatetimeRangeSelectPickerProps = ExtractPropTypes<
  typeof vroVanDatetimeRangeSelectPickerProps
>

export interface VroVanDatetimeRangeSelectPickerSlots extends Omit<VroVanCellSlots, 'default'> {
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
  'update:modelValue': [value: [string?, string?]]

  /**
   * 确认选择或清空值时触发。
   */
  change: [value: [string?, string?]]
}
