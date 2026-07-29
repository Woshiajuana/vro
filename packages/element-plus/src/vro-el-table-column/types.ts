import type { TableColumnCtx } from 'element-plus'
import type { ExtractPropTypes, PropType, VNode } from 'vue'

import type { VroElIconProps } from '../vro-el-icon'

export type VroElTableColumnFormatter = TableColumnCtx<any>['formatter']

// ElTableColumnProps 自有属性，因为 ElTableColumnProps 没有暴露出这个，只能自己维护一个
export const elTableColumnProps = {
  type: {
    type: String,
    default: 'default',
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  renderHeader: Function as PropType<TableColumnCtx<any>['renderHeader']>,
  sortable: {
    type: [Boolean, String],
    default: false,
  },
  sortMethod: Function as PropType<TableColumnCtx<any>['sortMethod']>,
  sortBy: [String, Function, Array] as PropType<TableColumnCtx<any>['sortBy']>,
  resizable: {
    type: Boolean,
    default: true,
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showOverflowTooltip: {
    type: [Boolean, Object] as PropType<TableColumnCtx<any>['showOverflowTooltip']>,
    default: undefined,
  },
  tooltipFormatter: Function as PropType<TableColumnCtx<any>['tooltipFormatter']>,
  fixed: [Boolean, String],
  formatter: Function as PropType<TableColumnCtx<any>['formatter']>,
  selectable: Function as PropType<TableColumnCtx<any>['selectable']>,
  reserveSelection: Boolean,
  filterMethod: Function as PropType<TableColumnCtx<any>['filterMethod']>,
  filteredValue: Array as PropType<TableColumnCtx<any>['filteredValue']>,
  filters: Array as PropType<TableColumnCtx<any>['filters']>,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  filterClassName: String,
  index: [Number, Function] as PropType<TableColumnCtx<any>['index']>,
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

  // 空值的时候，占位
  placeholder: {
    type: String,
    default: '-',
  },

  // 单位
  unit: String,

  // 格式化转换
  map: Object as PropType<Record<string, any>>,

  // 如果这里设置了值，则直接渲染这个
  renderDefault: Function as PropType<() => VNode | VNode[]>,

  renderContent: Function as PropType<() => VNode | VNode[]>,
  prefixIcon: Object as PropType<Partial<VroElIconProps>>,
  suffixIcon: Object as PropType<Partial<VroElIconProps>>,
}

export type VroElTableColumnProps = ExtractPropTypes<typeof vroElTableColumnProps>
