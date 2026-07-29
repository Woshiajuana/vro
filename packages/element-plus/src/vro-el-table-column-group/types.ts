import type { Component, ExtractPropTypes, PropType, Raw } from 'vue'

import type { VroElTableActionsColumnProps } from '../vro-el-table-actions-column'
import type { VroElTableColumnProps } from '../vro-el-table-column'

export type VroElTableColumnGroupColumnComponent = string | Raw<Component>

export type VroElTableColumnGroupHidden = (
  column: VroElTableColumnGroupColumn,
  index: number,
) => boolean

export interface VroElTableColumnGroupBaseColumn {
  /**
   * 列组件。可以传入组件对象、已注册组件名，或通过 vroElTableColumnGroupColumnManager 注册的 key。
   *
   * 不传时默认使用 VroElTableColumn。
   */
  is?: VroElTableColumnGroupColumnComponent

  /**
   * 列字段名，透传给列组件，同时作为默认 key 使用。
   */
  prop?: string

  /**
   * 额外列属性，会与当前配置合并后透传给列组件。
   */
  props?: Record<string, any>

  /**
   * 是否隐藏当前列，函数返回 true 时隐藏当前列。
   */
  hidden?: boolean | VroElTableColumnGroupHidden
}

export type VroElTableColumnGroupColumn = VroElTableColumnGroupBaseColumn &
  Partial<VroElTableColumnProps & VroElTableActionsColumnProps>

export type VroElTableColumnGroupColumns =
  | VroElTableColumnGroupColumn[]
  | (() => VroElTableColumnGroupColumn[])

export const vroElTableColumnGroupProps = {
  /**
   * 表格列配置。
   */
  columns: {
    type: [Array, Function] as PropType<VroElTableColumnGroupColumns>,
    default: () => [],
  },
}

export type VroElTableColumnGroupProps = ExtractPropTypes<typeof vroElTableColumnGroupProps>
