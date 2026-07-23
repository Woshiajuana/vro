import { omit } from '@daysnap/utils'
import type { ExtractPropTypes, PropType } from 'vue'

import { type VroVanCellEmits, vroVanCellProps, type VroVanCellSlots } from '../vro-van-cell'

export const vroVanTriggerCellCellProps = omit(vroVanCellProps, [
  'value',
  'formatter',
  'arrow',
  'clickable',
])

export const vroVanTriggerCellProps = {
  ...vroVanTriggerCellCellProps,

  /**
   * 当前展示值。
   */
  modelValue: {
    type: null as unknown as PropType<any>,
    default: '',
  },

  /**
   * 未选择时的占位内容。
   */
  placeholder: String,

  /**
   * 展示值格式化函数。
   */
  formatter: {
    default: (value: any) => value,
    type: Function as PropType<(value: any) => any>,
  },

  /**
   * 是否禁用。
   */
  disabled: Boolean,

  /**
   * 是否只读。
   */
  readonly: Boolean,

  /**
   * 是否显示清除按钮。
   */
  clearable: Boolean,

  /**
   * 是否显示右侧箭头。
   *
   * @default true
   */
  arrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否展示点击态。
   *
   * @default true
   */
  clickable: {
    type: Boolean,
    default: true,
  },
}

export type VroVanTriggerCellProps = ExtractPropTypes<typeof vroVanTriggerCellProps>

export interface VroVanTriggerCellSlots extends Omit<VroVanCellSlots, 'default'> {}

export interface VroVanTriggerCellEmits extends VroVanCellEmits {
  /**
   * 点击组件且非 disabled/readonly 时触发。
   */
  click: [event: MouseEvent]

  /**
   * 清空值时触发。
   */
  'update:modelValue': [value: any]

  /**
   * 点击清除按钮时触发。
   */
  clear: []
}
