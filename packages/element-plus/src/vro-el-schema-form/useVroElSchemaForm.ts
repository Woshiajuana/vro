import banana from '@daysnap/banana'
import { isFunction } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormInstance } from '.'
import type {
  VroElSchemaFormSchema,
  VroElSchemaFormSchemaBase,
  VroElSchemaFormSchemaFieldBase,
} from './types'

export interface UseVroElSchemaFormOptions
  extends Pick<UseAsyncTaskOptions<any>, 'throwError' | 'onError'> {
  source?: Record<string, any>
  instanceRef?: Ref<VroElSchemaFormInstance | undefined>
}

export type UseVroElSchemaFormSchema<TSchema extends VroElSchemaFormSchema> = {
  [K in keyof TSchema]: VroElSchemaFormSchemaFieldBase
}

export function useVroElSchemaForm<
  D extends Record<string, any> = any,
  T extends VroElSchemaFormSchema = VroElSchemaFormSchemaBase,
>(
  rawSchema: (() => T) | T,
  task?: (data: D) => Promise<void>,
  options: UseVroElSchemaFormOptions = {},
) {
  const { instanceRef, source, ...rest } = options
  const schema = reactive<UseVroElSchemaFormSchema<T>>(
    (isFunction(rawSchema) ? rawSchema() : rawSchema) as any,
  )

  const schemaFormRef = instanceRef ?? ref<VroElSchemaFormInstance>()

  const { loading, trigger, error, data } = useAsyncTask(async () => {
    if (!schemaFormRef.value) {
      return
    }
    try {
      await schemaFormRef.value.validate()
    } catch {
      throw ''
    }
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
