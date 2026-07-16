import { type PaginationProps, type TableProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElSchemaFilterProps } from '../vro-el-schema-filter'
import type { VroElTableColumnGroupColumn } from '../vro-el-table-column-group'

export interface VroElTableRequest<T = any> {
  (state: [number, number], query: any): Promise<[T[], number]>
}

export const vroElTableProps = {
  /**
   * 可筛选
   */
  filterable: {
    type: Boolean,
    default: true,
  },

  /**
   * 筛选属性
   */
  filterProps: Object as PropType<Partial<VroElSchemaFilterProps>>,

  /**
   * 列的数据
   */
  columns: {
    type: Array as PropType<VroElTableColumnGroupColumn[]>,
    default: () => [],
  },

  /**
   * 数据
   */
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  /**
   * loading
   */
  loading: Boolean,

  /**
   * 表格属性
   */
  tableProps: Object as PropType<Partial<TableProps<any>>>,

  /**
   * 可分页
   */
  pageable: {
    type: Boolean,
    default: true,
  },

  /**
   * 分页属性
   */
  paginationProps: Object as PropType<Partial<PaginationProps>>,

  /**
   * 可刷新
   */
  showRefresh: {
    type: Boolean,
    default: true,
  },

  /**
   * 显示头部
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
}

export type VroElTableProps = ExtractPropTypes<typeof vroElTableProps>
