import { type PaginationProps, type TableProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElSchemaFilterProps } from '../vro-el-schema-filter'
import type { VroElTableColumnGroupColumn } from '../vro-el-table-column-group'

export interface VroElTableRequestPayload {
  currentPage?: number
  pageSize?: number
  query?: Record<string, any>
}

export interface VroElTableRequest<T = any> {
  (state: [number, number], query: any): Promise<[T[], number]>
}

export const vroElTableProps = {
  /**
   * 是否启用筛选区。
   *
   * 当 filterProps.schema 为空时不会渲染筛选区。
   */
  filterable: {
    type: Boolean,
    default: true,
  },

  /**
   * 筛选区属性，透传给 VroElSchemaFilter。
   */
  filterProps: Object as PropType<Partial<VroElSchemaFilterProps>>,

  /**
   * 表格列配置。
   */
  columns: {
    type: Array as PropType<VroElTableColumnGroupColumn[]>,
    default: () => [],
  },

  /**
   * 表格数据。
   */
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  /**
   * 表格和筛选区 loading 状态。
   */
  loading: Boolean,

  /**
   * 表格属性，透传给 ElTable。
   */
  tableProps: Object as PropType<Partial<TableProps<any>>>,

  /**
   * 是否启用分页。
   */
  pageable: {
    type: Boolean,
    default: true,
  },

  /**
   * 分页属性，透传给 ElPagination。
   */
  paginationProps: Object as PropType<Partial<PaginationProps>>,

  /**
   * 是否显示刷新按钮。
   */
  showRefresh: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示头部区域。
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
}

export type VroElTableProps = ExtractPropTypes<typeof vroElTableProps>
