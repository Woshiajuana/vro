import { omit } from '@daysnap/utils'
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

export const vroVanDatetimeSelectPickerPickerProps = omit(vroVanDatetimePickerProps, ['modelValue'])
export const vroVanDatetimeSelectPickerTriggerCellProps = vroVanTriggerCellProps

export type VroVanDatetimeSelectPickerValueType = 'date' | 'string'

export const vroVanDatetimeSelectPickerProps = {
  ...vroVanDatetimeSelectPickerTriggerCellProps,

  ...vroVanDatetimeSelectPickerPickerProps,

  /**
   * 选中值类型。string 返回格式化字符串，date 返回 Date 对象。
   *
   * @default 'string'
   */
  valueType: {
    type: String as PropType<VroVanDatetimeSelectPickerValueType>,
    default: 'string',
  },

  /**
   * 清空时回填的值。
   *
   * @default ''
   */
  emptyValue: {
    type: null as unknown as PropType<any>,
    default: '',
  },
}

export type VroVanDatetimeSelectPickerProps = ExtractPropTypes<
  typeof vroVanDatetimeSelectPickerProps
>

export interface VroVanDatetimeSelectPickerSlots extends VroVanTriggerCellSlots {}

export interface VroVanDatetimeSelectPickerEmits extends VroVanTriggerCellEmits {
  /**
   * 确认选择或清空值时触发。
   */
  'update:modelValue': [value: any]

  /**
   * 确认选择或清空值时触发。
   */
  change: [value: any, result?: VroVanDatetimePickerResult]
}
