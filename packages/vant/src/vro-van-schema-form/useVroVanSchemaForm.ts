import banana from '@daysnap/banana'
import { isFunction } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { reactive, type Ref, ref } from 'vue'

import type { VroVanSchemaFormInstance } from '.'
import type {
  VroVanSchemaFormSchema,
  VroVanSchemaFormSchemaBase,
  VroVanSchemaFormSchemaFieldBase,
} from './types'

export interface UseVroVanSchemaFormOptions
  extends Pick<UseAsyncTaskOptions<any>, 'throwError' | 'onError'> {
  source?: Record<string, any>
  instanceRef?: Ref<VroVanSchemaFormInstance | undefined>
}

export type UseVroVanSchemaFormSchema<TSchema extends VroVanSchemaFormSchema> = {
  [K in keyof TSchema]: VroVanSchemaFormSchemaFieldBase
}

export function useVroVanSchemaForm<
  D extends Record<string, any> = any,
  T extends VroVanSchemaFormSchema = VroVanSchemaFormSchemaBase,
>(
  rawSchema: (() => T) | T,
  task?: (data: D) => Promise<void>,
  options: UseVroVanSchemaFormOptions = {},
) {
  const { instanceRef, source, ...rest } = options
  const schema = reactive<UseVroVanSchemaFormSchema<T>>(
    (isFunction(rawSchema) ? rawSchema() : rawSchema) as any,
  )
  const schemaFormRef = instanceRef ?? ref<VroVanSchemaFormInstance>()

  const { loading, trigger, error, data } = useAsyncTask(async () => {
    if (!schemaFormRef.value) {
      return
    }

    await schemaFormRef.value.validate()
    const data = (await schemaFormRef.value.extractValues()) as D

    await task?.(data)
    return data
  }, rest)

  if (source) {
    banana.assignment(source, schema as any)
  }

  return {
    data,
    error,
    schema,
    schemaFormRef,
    loading,
    trigger,
  }
}
