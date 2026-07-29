import type { Component, ExtractPropTypes, PropType } from 'vue'

import { elTableColumnProps } from '../utils'
import type { VroElTableColumnScope } from '../vro-el-table-column/types'

export interface VroElTableActionsColumnAction<T = any> {
  /**
   * 操作唯一标识，用于优化列表渲染。
   */
  key?: string | number

  /**
   * 操作文本。
   */
  label: string

  /**
   * 操作图标。
   */
  icon?: string | Component

  /**
   * 按钮类型。
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'

  /**
   * 是否禁用。
   */
  disabled?: boolean

  /**
   * 是否隐藏，返回 true 时隐藏当前操作。
   */
  hidden?: boolean | ((row: T, index: number) => boolean)

  /**
   * 点击操作时触发。
   */
  onAction?: (row: T, index: number) => any
}

export type VroElTableActionsColumnActions<T = any> =
  | VroElTableActionsColumnAction<T>[]
  | ((row: T, index: number) => VroElTableActionsColumnAction<T>[])

export const vroElTableActionsColumnProps = {
  ...elTableColumnProps,

  /**
   * 列标题。
   */
  label: String,

  /**
   * 直接展示的操作项。
   */
  actions: {
    type: [Array, Function] as PropType<VroElTableActionsColumnActions>,
    default: () => [],
  },

  /**
   * 更多操作下拉菜单触发方式。
   */
  moreTrigger: {
    type: String as PropType<'hover' | 'click' | 'contextmenu'>,
    default: 'hover',
  },

  /**
   * 更多操作按钮文本。
   */
  moreText: String,

  /**
   * 收纳到更多下拉菜单中的操作项。
   */
  moreActions: {
    type: [Array, Function] as PropType<VroElTableActionsColumnActions>,
    default: () => [],
  },
}

export type VroElTableActionsColumnProps = ExtractPropTypes<typeof vroElTableActionsColumnProps>

export interface VroElTableActionsColumnActionScope<T extends Record<string, any> = any>
  extends VroElTableColumnScope<T> {
  /**
   * 当前操作项。
   */
  action: VroElTableActionsColumnAction<T>
}

export interface VroElTableActionsColumnSlots<T extends Record<string, any> = any> {
  /**
   * 自定义整列内容。
   */
  default?: (props: VroElTableColumnScope<T>) => any

  /**
   * 自定义直接展示的操作项内容。
   */
  action?: (props: VroElTableActionsColumnActionScope<T>) => any

  /**
   * 自定义更多操作项内容。
   */
  'more-action'?: (props: VroElTableActionsColumnActionScope<T>) => any
}
