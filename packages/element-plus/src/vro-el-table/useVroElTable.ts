import banana from '@ajuanjs/banana'
import { filterEmptyValue, isNumber } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { computed, type ComputedRef, reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormSchema, VroElSchemaFormSchemaFieldBase } from '../vro-el-schema-form'
import type { VroElTableRequest } from './types'

export interface UseVroElTableOptions<Row extends Record<string, any> = any>
  extends Pick<UseAsyncTaskOptions<any>, 'activated' | 'immediate' | 'throwError' | 'onError'> {
  query?: Ref<Record<string, any>>
  initialValue?: Row[]

  // /**
  //  * 请求失败时的回调。
  //  *
  //  * 返回 `false` 时阻断默认错误处理（不写入 `error`、不按 `throwError` 抛出），
  //  * 返回 `true` 或不返回值时走默认逻辑。允许直接写成不返回值的回调，如 `onError: (err) => console.log(err)`。
  //  */
  // onError?: (err: unknown) => void | boolean | undefined | Promise<void | boolean | undefined>
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
  trigger: (params?: UseVroElTableAsyncTaskParams) => Promise<Row[]>
  data: Ref<Row[]>
  loading: Ref<boolean>
  pagination: UseVroElTablePagination
}

/**
 * 表格请求状态管理。
 *
 * 只负责筛选、分页、请求和 loading 状态，不接管列配置；
 * 列配置请用 `defineVroElTableColumns<Row>()` 单独定义后传给表格组件。
 */
// 重载 1：请求函数
export function useVroElTable<Row extends Record<string, any>>(
  request: VroElTableRequest<Row>,
  options?: UseVroElTableOptions<Row>,
): UseVroElTableReturn<Row, never>

// 重载 2：筛选表单 + 请求函数
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
  requestOrOptions?: any,
  maybeOptions?: any,
): UseVroElTableReturn<any, any> {
  // 第一个参数是函数则为请求函数，否则是筛选表单
  const hasSchema = typeof schemaOrRequest !== 'function'

  const rawSchema = hasSchema ? schemaOrRequest : undefined
  const request = (hasSchema ? requestOrOptions : schemaOrRequest) as VroElTableRequest<any>
  const options = ((hasSchema ? maybeOptions : requestOrOptions) ?? {}) as UseVroElTableOptions<any>

  const schema = rawSchema ? reactive<UseVroElTableSchema<any>>(rawSchema) : undefined

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

      // request 允许返回元组或数组两种写法，这里统一按元组处理
      const [list, total] = (await request([currentPage, pageSize], query.value)) as [any[], number]

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
    data: data.value,
    pagination,
  }))

  return {
    tableProps,
    query,
    schema,
    trigger,
    data,
    loading,
    pagination,
  } as UseVroElTableReturn<any, any>
}
