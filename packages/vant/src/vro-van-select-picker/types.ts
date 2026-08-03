import { omit } from '@daysnap/utils'
import type { PickerColumn } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

import { vroVanPickerProps } from '../vro-van-picker'
import {
  type VroVanTriggerCellEmits,
  vroVanTriggerCellProps,
  type VroVanTriggerCellSlots,
} from '../vro-van-trigger-cell'

export const vroVanSelectPickerPickerProps = omit(vroVanPickerProps, ['modelValue', 'columns'])
export const vroVanSelectPickerTriggerCellProps = vroVanTriggerCellProps

export type VroVanSelectPickerColumns = PickerColumn | PickerColumn[]
export type VroVanSelectPickerOptions =
  | VroVanSelectPickerColumns
  | (() => Promise<VroVanSelectPickerColumns> | VroVanSelectPickerColumns)
export type VroVanSelectPickerTrigger = 'immediately' | 'lazy'

export const vroVanSelectPickerProps = {
  ...vroVanSelectPickerTriggerCellProps,

  ...vroVanSelectPickerPickerProps,

  /**
   * 选项加载时机。immediately 会在组件挂载后立即加载，lazy 会在点击时加载。
   *
   * @default 'lazy'
   */
  trigger: {
    type: String as PropType<VroVanSelectPickerTrigger>,
    default: 'lazy',
  },

  /**
   * 选择器选项，支持数组或异步函数。
   */
  options: {
    type: [Array, Function] as PropType<VroVanSelectPickerOptions>,
    default: () => [],
  },

  /**
   * 选中值类型。string 返回选项 value，object 返回选中 option。多列或级联选择时返回数组。
   *
   * @default 'string'
   */
  valueType: {
    type: String as PropType<'object' | 'string'>,
    default: 'string',
  },

  /**
   * 清空时回填的值。未设置时，数组值清空为 []，其他值清空为 ''。
   */
  emptyValue: null as unknown as PropType<any>,
}

export type VroVanSelectPickerProps = ExtractPropTypes<typeof vroVanSelectPickerProps>

export interface VroVanSelectPickerSlots extends VroVanTriggerCellSlots {}

export interface VroVanSelectPickerEmits extends VroVanTriggerCellEmits {
  /**
   * 选中值变化时触发。
   */
  'update:modelValue': [value: any]

  /**
   * 点击确认按钮时触发。
   */
  change: [value: any]
}
