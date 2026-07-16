import banana from '@daysnap/banana'
import { filterEmptyValue, isFunction, isNumber } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { computed, reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormSchema, VroElSchemaFormSchemaField } from '../vro-el-schema-form'
import { type VroElTableColumnGroupColumn } from '../vro-el-table-column-group'

export interface UseVroElTableOptions<D>
  extends Pick<UseAsyncTaskOptions<any>, 'activated' | 'immediate' | 'throwError' | 'onError'> {
  query?: Ref<Record<string, any>>
  initialValue?: D
}

export interface UseVroElTableTask<T = any> {
  (state: [number, number], query: any): Promise<[T[], number]>
}

export type UseVroElTableAsyncTaskParams =
  | { currentPage?: number; pageSize?: number; query?: Record<string, any> }
  | number

export type UseVroElTableResultRawSchema = (() => VroElSchemaFormSchema) | VroElSchemaFormSchema

export type UseVroElTableResultRawColumns =
  | (() => VroElTableColumnGroupColumn[])
  | VroElTableColumnGroupColumn[]

export function useVroElTable<
  R extends VroElSchemaFormSchema,
  T extends UseVroElTableTask,
  S extends VroElSchemaFormSchema = { [P in keyof R]: VroElSchemaFormSchemaField },
  D = Awaited<ReturnType<T>>[0],
>(
  rowSchema: (() => R) | R,
  rawColumns: UseVroElTableResultRawColumns,
  task: T,
  options: UseVroElTableOptions<D> = {},
) {
  const { query: rawQuery } = options
  const schema = reactive<S>((isFunction(rowSchema) ? rowSchema() : rowSchema) as any)
  const columns = reactive(
    (isFunction(rawColumns) ? rawColumns() : rawColumns).filter((item) => {
      const { hidden = false } = item
      return isFunction(hidden) ? !hidden() : !hidden
    }),
  )

  const query =
    rawQuery ?? ref<Record<string, any>>(filterEmptyValue(banana.extract(schema as any), true))

  const state = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })

  const { trigger, data, loading } = useAsyncTask(
    async (params?: UseVroElTableAsyncTaskParams) => {
      if (isNumber(params)) {
        params = { currentPage: params }
      }
      const { currentPage, pageSize } = Object.assign({}, state, params)
      if (params?.query) {
        query.value = params?.query
      }

      state.currentPage = currentPage
      state.pageSize = pageSize

      const [list, total] = await task([currentPage, pageSize], query.value)

      state.total = total

      return (list || []) as D
    },
    {
      immediate: true,
      throwError: true,
      initialValue: [],
      ...(options as any),
    },
  )

  const attrs = computed(() => {
    return {
      filterProps: {
        schema,
      },
      loading: loading.value,
      columns,
      data: data.value,
      paginationProps: state,
    }
  })

  return {
    attrs,
    query,
    schema,
    columns,
    trigger,
    data,
    loading,
  }
}
