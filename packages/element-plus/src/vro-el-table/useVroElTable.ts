import banana from '@ajuanjs/banana'
import { filterEmptyValue, isNumber } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { computed, type ComputedRef, reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormSchema, VroElSchemaFormSchemaFieldBase } from '../vro-el-schema-form'
import type { VroElTableColumnGroupColumns } from '../vro-el-table-column-group'
import type { VroElTableRequest } from './types'

export interface UseVroElTableOptions<Row extends Record<string, any> = any>
  extends Pick<UseAsyncTaskOptions<any>, 'activated' | 'immediate' | 'throwError' | 'onError'> {
  query?: Ref<Record<string, any>>
  initialValue?: Row[]
}

export type UseVroElTableAsyncTaskParams =
  | { currentPage?: number; pageSize?: number; query?: Record<string, any> }
  | number

export type UseVroElTableSchema<T extends VroElSchemaFormSchema> = {
  [P in keyof T]: VroElSchemaFormSchemaFieldBase
}

export interface UseVroElTablePagination {
  currentPage: number
  pageSize: number
  total: number
}

export interface UseVroElTableTableProps<
  Row extends Record<string, any> = any,
  R extends VroElSchemaFormSchema = never,
> {
  schema: UseVroElTableSchema<R> | undefined
  loading: boolean
  columns: VroElTableColumnGroupColumns<Row>
  data: Row[]
  pagination: UseVroElTablePagination
}

/**
 * 传入了筛选表单时返回 schema 类型，未传入时返回 undefined。
 */
export type UseVroElTableSchemaResult<R extends VroElSchemaFormSchema> = [R] extends [never]
  ? undefined
  : UseVroElTableSchema<R>

export interface UseVroElTableReturn<
  Row extends Record<string, any> = any,
  R extends VroElSchemaFormSchema = never,
> {
  tableProps: ComputedRef<UseVroElTableTableProps<Row, R>>
  query: Ref<Record<string, any> | undefined>
  schema: UseVroElTableSchemaResult<R>
  columns: VroElTableColumnGroupColumns<Row>
  trigger: (params?: UseVroElTableAsyncTaskParams) => Promise<Row[]>
  data: Ref<Row[]>
  loading: Ref<boolean>
  pagination: UseVroElTablePagination
}

/**
 * 表格请求状态管理。
 *
 * 参数统一按「筛选表单 → 请求函数 → 列配置 → 选项」排列，`request` 始终紧跟筛选表单，
 * 因此 `Row` 在解析列配置之前就能从 `request` 的返回值推断出来，列配置里的 `row` 可以直接拿到具体类型。
 */
// 重载 1：筛选表单 + 请求函数 + 列配置
export function useVroElTable<
  Row extends Record<string, any>,
  R extends VroElSchemaFormSchema = VroElSchemaFormSchema,
>(
  rowSchema: R,
  request: VroElTableRequest<Row>,
  rawColumns: VroElTableColumnGroupColumns<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, R>

// 重载 2：请求函数 + 列配置
export function useVroElTable<Row extends Record<string, any>>(
  request: VroElTableRequest<Row>,
  rawColumns: VroElTableColumnGroupColumns<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, never>

// 重载 3：筛选表单 + 请求函数（不传列配置，列由插槽或 tableProps.columns 自行补充）
export function useVroElTable<
  Row extends Record<string, any>,
  R extends VroElSchemaFormSchema = VroElSchemaFormSchema,
>(
  rowSchema: R,
  request: VroElTableRequest<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, R>

// 实现签名
export function useVroElTable(
  schemaOrRequest: any,
  requestOrColumns?: any,
  columnsOrOptions?: any,
  maybeOptions?: any,
): UseVroElTableReturn<any, any> {
  // 第一个参数是筛选表单（既不是数组也不是函数），否则就是请求函数
  const hasSchema = !Array.isArray(schemaOrRequest) && typeof schemaOrRequest !== 'function'

  const rawSchema = hasSchema ? schemaOrRequest : undefined
  const request = (hasSchema ? requestOrColumns : schemaOrRequest) as VroElTableRequest<any>

  // 列配置可省略：传数组就是列配置，否则当作 options
  const columnsOrOptionsArg = hasSchema ? columnsOrOptions : requestOrColumns
  const rawColumns = Array.isArray(columnsOrOptionsArg) ? columnsOrOptionsArg : []
  const options = ((Array.isArray(columnsOrOptionsArg) ? maybeOptions : columnsOrOptionsArg) ??
    {}) as UseVroElTableOptions<any>

  const schema = rawSchema ? reactive<UseVroElTableSchema<any>>(rawSchema) : undefined
  const columns = reactive(rawColumns)

  const { query: rawQuery, ...asyncTaskOptions } = options
  const query = rawQuery ?? ref<Record<string, any>>()

  const pagination = reactive<UseVroElTablePagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })

  const { trigger, data, loading } = useAsyncTask(
    async (params?: UseVroElTableAsyncTaskParams) => {
      if (isNumber(params)) {
        params = { currentPage: params }
      }
      const { currentPage, pageSize } = Object.assign({}, pagination, params)
      if (params?.query) {
        query.value = params.query
      }

      if (!query.value) {
        query.value = schema ? filterEmptyValue(await banana.extract(schema as any), true) : {}
      }

      pagination.currentPage = currentPage
      pagination.pageSize = pageSize

      const [list, total] = await request([currentPage, pageSize], query.value)

      pagination.total = total

      return list || []
    },
    {
      immediate: true,
      throwError: true,
      initialValue: [],
      ...(asyncTaskOptions as any),
    },
  )

  const tableProps = computed<UseVroElTableTableProps<any, any>>(() => ({
    schema,
    loading: loading.value,
    columns,
    data: data.value,
    pagination,
  }))

  return {
    tableProps,
    query,
    schema,
    columns,
    trigger,
    data,
    loading,
    pagination,
  } as UseVroElTableReturn<any, any>
}
