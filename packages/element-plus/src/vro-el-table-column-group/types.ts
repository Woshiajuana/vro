import type { TableColumnCtx } from 'element-plus'
import type { Component, ExtractPropTypes, PropType, Raw } from 'vue'

import type {
  VroElTableActionsColumnActions,
  VroElTableActionsColumnProps,
} from '../vro-el-table-actions-column'
import type { VroElTableColumnProps, VroElTableColumnRender } from '../vro-el-table-column'

export type VroElTableColumnGroupFormatter<T extends Record<string, any> = any> = (
  row: T,
  column: TableColumnCtx<T>,
  cellValue: any,
  index: number,
) => any

export type VroElTableColumnGroupTableColumnProps<T extends Record<string, any> = any> = Partial<
  Omit<VroElTableColumnProps, 'formatter' | 'renderDefault' | 'renderContent'>
> & {
  /**
   * 单元格格式化函数。
   */
  formatter?: VroElTableColumnGroupFormatter<T>

  /**
   * 自定义整格内容渲染函数，优先级高于 renderContent、formatter、map。
   */
  renderDefault?: VroElTableColumnRender<T>

  /**
   * 自定义中间主体内容渲染函数。
   */
  renderContent?: VroElTableColumnRender<T>
}

export type VroElTableColumnGroupActionsColumnProps<T extends Record<string, any> = any> = Partial<
  Omit<VroElTableActionsColumnProps, 'actions' | 'formatter' | 'moreActions'>
> & {
  /**
   * 单元格格式化函数。
   */
  formatter?: VroElTableColumnGroupFormatter<T>

  /**
   * 直接展示的操作项。
   */
  actions?: VroElTableActionsColumnActions<T>

  /**
   * 收纳到更多下拉菜单中的操作项。
   */
  moreActions?: VroElTableActionsColumnActions<T>
}

export interface VroElTableColumnGroupColumnPropsMap<T extends Record<string, any> = any> {
  VroElTableColumn: VroElTableColumnGroupTableColumnProps<T>
  VroElTableActionsColumn: VroElTableColumnGroupActionsColumnProps<T>
}

export type VroElTableColumnGroupColumnType = keyof VroElTableColumnGroupColumnPropsMap<any>
export type VroElTableColumnGroupRawComponent = Raw<Component>

export interface VroElTableColumnGroupBaseColumn<TProps = Record<string, any>> {
  /**
   * 列组件。可以传入组件对象、内置组件名，或已扩展到 VroElTableColumnGroupColumnPropsMap 的注册 key。
   *
   * 不传时默认使用 VroElTableColumn。
   */
  is?: VroElTableColumnGroupColumnType | VroElTableColumnGroupRawComponent

  /**
   * 列字段名，透传给列组件，同时作为默认 key 使用。
   */
  prop?: string

  /**
   * 额外列属性，会与当前配置合并后透传给列组件。
   */
  props?: TProps

  /**
   * 是否隐藏当前列，函数返回 true 时隐藏当前列。
   */
  hidden?: boolean | (() => boolean)
}

export type VroElTableColumnGroupMappedColumn<T extends Record<string, any> = any> = {
  [K in VroElTableColumnGroupColumnType]: VroElTableColumnGroupBaseColumn<
    VroElTableColumnGroupColumnPropsMap<T>[K]
  > &
    VroElTableColumnGroupColumnPropsMap<T>[K] & {
      is: K
    }
}[VroElTableColumnGroupColumnType]

export type VroElTableColumnGroupDefaultColumn<T extends Record<string, any> = any> =
  VroElTableColumnGroupBaseColumn<VroElTableColumnGroupColumnPropsMap<T>['VroElTableColumn']> &
    VroElTableColumnGroupColumnPropsMap<T>['VroElTableColumn'] & {
      is?: undefined
    }

export type VroElTableColumnGroupCustomColumn = VroElTableColumnGroupBaseColumn & {
  is: VroElTableColumnGroupRawComponent
  [key: string]: any
}

export type VroElTableColumnGroupColumn<T extends Record<string, any> = any> =
  | VroElTableColumnGroupDefaultColumn<T>
  | VroElTableColumnGroupMappedColumn<T>
  | VroElTableColumnGroupCustomColumn

export type VroElTableColumnGroupColumns<T extends Record<string, any> = any> =
  VroElTableColumnGroupColumn<T>[]

export const vroElTableColumnGroupProps = {
  /**
   * 表格列配置。
   */
  columns: {
    type: Array as PropType<VroElTableColumnGroupColumns>,
    default: () => [],
  },
}

export type VroElTableColumnGroupProps = ExtractPropTypes<typeof vroElTableColumnGroupProps>
