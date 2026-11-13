import { type PaginationProps, type TableProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

import type { VroElSchemaFilterProps } from '../vro-el-schema-filter'
import type { VroElSchemaFormSchema } from '../vro-el-schema-form'
import type { VroElTableColumnGroupColumn } from '../vro-el-table-column-group'

export interface VroElTableRequestPayload {
  currentPage?: number
  pageSize?: number
  query?: Record<string, any>
}

/**
 * 请求函数的分页参数：[currentPage, pageSize]。
 */
export type VroElTableRequestParams = [currentPage: number, pageSize: number]

/**
 * 请求函数的查询参数。
 */
export type VroElTableRequestQuery = Record<string, any>

export interface VroElTableRequest<T = any> {
  (state: VroElTableRequestParams, query: VroElTableRequestQuery): Promise<[T[], number]>
}

export interface VroElTableEmits {
  request: [payload?: VroElTableRequestPayload]
  'selection-change': [selection: any[]]
}

export interface VroElTableSlots {
  /**
   * 自定义表格列内容，追加在 columns 渲染的列之后。
   */
  default?: () => any

  /**
   * 自定义头部标题区域。
   */
  title?: () => any

  /**
   * 自定义头部操作区域，追加在刷新按钮之后。
   */
  actions?: () => any

  /**
   * 自定义表格内部前置列内容，渲染在 columns 之前。
   */
  'content-prefix'?: () => any
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
   * 表单字段 schema 配置。
   */
  schema: Object as PropType<VroElSchemaFormSchema>,

  /**
   * 筛选区属性，透传给 VroElSchemaFilter。
   */
  filterProps: Object as PropType<Partial<Pick<VroElSchemaFilterProps, 'schema'>>>,

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
   * 分页属性，透传给 ElPagination。
   */
  pagination: Object as PropType<
    Partial<Pick<PaginationProps, 'currentPage' | 'total' | 'pageSize'>>
  >,

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
