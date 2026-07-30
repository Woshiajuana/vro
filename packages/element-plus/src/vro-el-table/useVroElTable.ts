import banana from '@daysnap/banana'
import { filterEmptyValue, isFunction, isNumber } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { computed, reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormSchema, VroElSchemaFormSchemaField } from '../vro-el-schema-form'
import { type VroElTableColumnGroupColumns } from '../vro-el-table-column-group'

export interface UseVroElTableOptions<Row extends Record<string, any> = any>
  extends Pick<UseAsyncTaskOptions<any>, 'activated' | 'immediate' | 'throwError' | 'onError'> {
  query?: Ref<Record<string, any>>
  initialValue?: Row[]
}

export interface UseVroElTableTask<T = any> {
  (state: [number, number], query: any): Promise<[T[], number]>
}

export type UseVroElTableAsyncTaskParams =
  | { currentPage?: number; pageSize?: number; query?: Record<string, any> }
  | number

export type UseVroElTableRawColumns<T extends Record<string, any> = any> =
  | (() => VroElTableColumnGroupColumns<T>)
  | VroElTableColumnGroupColumns<T>

export function useVroElTable<
  Row extends Record<string, any> = any,
  R extends VroElSchemaFormSchema = VroElSchemaFormSchema,
  S extends VroElSchemaFormSchema = { [P in keyof R]: VroElSchemaFormSchemaField },
>(
  rowSchema: (() => R) | R,
  rawColumns: UseVroElTableRawColumns<Row>,
  task: UseVroElTableTask<Row>,
  options: UseVroElTableOptions<Row> = {},
) {
  const { query: rawQuery } = options
  const schema = reactive<S>((isFunction(rowSchema) ? rowSchema() : rowSchema) as any)
  const columns = reactive(isFunction(rawColumns) ? rawColumns() : rawColumns)

  const query =
    rawQuery ?? ref<Record<string, any>>(filterEmptyValue(banana.extract(schema as any), true))

  const pagination = reactive({
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
        query.value = params?.query
      }

      pagination.currentPage = currentPage
      pagination.pageSize = pageSize

      const [list, total] = await task([currentPage, pageSize], query.value)

      pagination.total = total

      return list || []
    },
    {
      immediate: true,
      throwError: true,
      initialValue: [],
      ...(options as any),
    },
  )

  const tableProps = computed(() => {
    return {
      filterProps: {
        schema,
      },
      loading: loading.value,
      columns,
      data: data.value,
      paginationProps: pagination,
    }
  })

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
