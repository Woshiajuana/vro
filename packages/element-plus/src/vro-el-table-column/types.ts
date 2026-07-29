import type { TableColumnCtx } from 'element-plus'
import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

import { elTableColumnProps } from '../utils'
import type { VroElIconProps } from '../vro-el-icon'

export type VroElTableColumnFormatter = TableColumnCtx<any>['formatter']
export type VroElTableColumnIcon = string | Partial<VroElIconProps>

export interface VroElTableColumnScope<T extends Record<string, any> = any> {
  row: T
  column: TableColumnCtx<T>
  $index: number
}

export interface VroElTableColumnHeaderScope<T extends Record<string, any> = any> {
  column: TableColumnCtx<T>
  $index: number
}

export interface VroElTableColumnExpandScope {
  expanded: boolean
  expandable: boolean
}

export interface VroElTableColumnFilterIconScope {
  filterOpened: boolean
}

export type VroElTableColumnRender<T extends Record<string, any> = any> = (
  scope: VroElTableColumnScope<T>,
) => VNodeChild

export const vroElTableColumnProps = {
  ...elTableColumnProps,

  /**
   * 空值占位内容。
   */
  placeholder: {
    type: String,
    default: '-',
  },

  /**
   * 非空值后缀单位。
   */
  unit: String,

  /**
   * 超出指定行数后隐藏并显示省略号。
   */
  lineClamp: Number,

  /**
   * 枚举值映射表。
   */
  map: Object as PropType<Record<string, any>>,

  /**
   * 自定义整格内容渲染函数，优先级高于 renderContent、formatter、map。
   */
  renderDefault: Function as PropType<VroElTableColumnRender>,

  /**
   * 自定义中间主体内容渲染函数。
   */
  renderContent: Function as PropType<VroElTableColumnRender>,

  /**
   * 内容前缀图标。
   */
  prefixIcon: [String, Object] as PropType<VroElTableColumnIcon>,

  /**
   * 内容后缀图标。
   */
  suffixIcon: [String, Object] as PropType<VroElTableColumnIcon>,
}

export type VroElTableColumnProps = ExtractPropTypes<typeof vroElTableColumnProps>

export interface VroElTableColumnSlots<T extends Record<string, any> = any> {
  /**
   * 自定义单元格内容。
   */
  default?: (props: VroElTableColumnScope<T>) => any

  /**
   * 自定义表头内容。
   */
  header?: (props: VroElTableColumnHeaderScope<T>) => any

  /**
   * 自定义展开图标。
   */
  expand?: (props: VroElTableColumnExpandScope) => any

  /**
   * 自定义筛选图标。
   */
  'filter-icon'?: (props: VroElTableColumnFilterIconScope) => any

  /**
   * 自定义默认内容前缀。
   */
  prefix?: (props: VroElTableColumnScope<T>) => any

  /**
   * 自定义默认内容后缀。
   */
  suffix?: (props: VroElTableColumnScope<T>) => any
}
