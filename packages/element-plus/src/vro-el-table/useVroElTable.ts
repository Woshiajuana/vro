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

export interface UseVroElTableReturn<
  Row extends Record<string, any> = any,
  R extends VroElSchemaFormSchema = never,
> {
  tableProps: ComputedRef<UseVroElTableTableProps<Row, R>>
  query: Ref<Record<string, any> | undefined>
  schema: UseVroElTableSchema<R> | undefined
  columns: VroElTableColumnGroupColumns<Row>
  trigger: (params?: UseVroElTableAsyncTaskParams) => Promise<Row[]>
  data: Ref<Row[]>
  loading: Ref<boolean>
  pagination: UseVroElTablePagination
}

// 重载 1：有筛选表单
export function useVroElTable<
  Row extends Record<string, any> = any,
  R extends VroElSchemaFormSchema = VroElSchemaFormSchema,
>(
  rowSchema: R,
  rawColumns: VroElTableColumnGroupColumns<Row>,
  request: VroElTableRequest<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, R>

// 重载 2：无筛选表单
export function useVroElTable<Row extends Record<string, any> = any>(
  rawColumns: VroElTableColumnGroupColumns<Row>,
  request: VroElTableRequest<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, never>

// 实现签名
export function useVroElTable(
  schemaOrColumns: any,
  columnsOrRequest: any,
  requestOrOptions?: any,
  maybeOptions?: any,
): UseVroElTableReturn<any, any> {
  const firstIsColumns = Array.isArray(schemaOrColumns)

  const rawSchema = firstIsColumns ? undefined : schemaOrColumns
  const rawColumns = firstIsColumns ? schemaOrColumns : columnsOrRequest
  const request = (firstIsColumns ? columnsOrRequest : requestOrOptions) as VroElTableRequest<any>
  const options = ((firstIsColumns ? requestOrOptions : maybeOptions) ??
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
  }
}
