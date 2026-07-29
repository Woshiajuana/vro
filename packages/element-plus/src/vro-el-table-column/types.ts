import type { TableColumnCtx } from 'element-plus'
import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

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

// ElTableColumnProps 自有属性，因为 ElTableColumnProps 没有暴露出这个，只能自己维护一个
export const elTableColumnProps = {
  /**
   * 列类型。
   */
  type: {
    type: String,
    default: 'default',
  },

  /**
   * 列标题。
   */
  label: String,

  /**
   * 单元格类名。
   */
  className: String,

  /**
   * 表头类名。
   */
  labelClassName: String,

  /**
   * 字段名。
   */
  property: String,

  /**
   * 字段名，property 的别名。
   */
  prop: String,

  /**
   * 列宽度。
   */
  width: {
    type: [String, Number],
    default: '',
  },

  /**
   * 列最小宽度。
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },

  /**
   * 自定义表头渲染函数。
   */
  renderHeader: Function as PropType<TableColumnCtx<any>['renderHeader']>,

  /**
   * 是否可排序。
   */
  sortable: {
    type: [Boolean, String],
    default: false,
  },

  /**
   * 自定义排序方法。
   */
  sortMethod: Function as PropType<TableColumnCtx<any>['sortMethod']>,

  /**
   * 指定排序字段或排序函数。
   */
  sortBy: [String, Function, Array] as PropType<TableColumnCtx<any>['sortBy']>,

  /**
   * 是否允许拖拽调整列宽。
   */
  resizable: {
    type: Boolean,
    default: true,
  },

  /**
   * 列 key。
   */
  columnKey: String,

  /**
   * 单元格对齐方式。
   */
  align: String,

  /**
   * 表头对齐方式。
   */
  headerAlign: String,

  /**
   * 内容溢出时是否显示 tooltip。
   */
  showOverflowTooltip: {
    type: [Boolean, Object] as PropType<TableColumnCtx<any>['showOverflowTooltip']>,
    default: undefined,
  },

  /**
   * tooltip 内容格式化函数。
   */
  tooltipFormatter: Function as PropType<TableColumnCtx<any>['tooltipFormatter']>,

  /**
   * 是否固定列。
   */
  fixed: [Boolean, String],

  /**
   * 单元格格式化函数。
   */
  formatter: Function as PropType<TableColumnCtx<any>['formatter']>,

  /**
   * selection 列是否可选择。
   */
  selectable: Function as PropType<TableColumnCtx<any>['selectable']>,

  /**
   * 数据刷新后是否保留选中项。
   */
  reserveSelection: Boolean,

  /**
   * 筛选方法。
   */
  filterMethod: Function as PropType<TableColumnCtx<any>['filterMethod']>,

  /**
   * 已筛选值。
   */
  filteredValue: Array as PropType<TableColumnCtx<any>['filteredValue']>,

  /**
   * 筛选项。
   */
  filters: Array as PropType<TableColumnCtx<any>['filters']>,

  /**
   * 筛选弹层位置。
   */
  filterPlacement: String,

  /**
   * 是否支持多选筛选。
   */
  filterMultiple: {
    type: Boolean,
    default: true,
  },

  /**
   * 筛选弹层类名。
   */
  filterClassName: String,

  /**
   * 自定义 index 列序号。
   */
  index: [Number, Function] as PropType<TableColumnCtx<any>['index']>,

  /**
   * 排序策略轮转顺序。
   */
  sortOrders: {
    type: Array as PropType<TableColumnCtx<any>['sortOrders']>,
    default: () => {
      return ['ascending', 'descending', null]
    },
    validator: (val: TableColumnCtx<any>['sortOrders']) => {
      return val.every((order: 'ascending' | 'descending' | null) =>
        ['ascending', 'descending', null].includes(order),
      )
    },
  },
}

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
