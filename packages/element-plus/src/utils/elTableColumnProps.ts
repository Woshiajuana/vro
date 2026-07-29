import type { TableColumnCtx } from 'element-plus'
import type { PropType } from 'vue'

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
