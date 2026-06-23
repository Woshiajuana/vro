import banana from '@daysnap/banana'
import { isFunction } from '@daysnap/utils'
import { useAsyncTask, type UseAsyncTaskOptions } from '@vrojs/use'
import { reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormInstance } from '.'
import type { VroElSchemaFormSchema } from './types'

export interface UseVroElSchemaFormOptions
  extends Pick<UseAsyncTaskOptions<any>, 'throwError' | 'onError'> {
  source?: Record<string, any>
  instanceRef?: Ref<VroElSchemaFormInstance | undefined>
}

export function useVroElSchemaForm<T extends Record<string, any> = Record<string, any>>(
  rawSchema: (() => VroElSchemaFormSchema) | VroElSchemaFormSchema,
  task?: (data: T) => Promise<void>,
  options: UseVroElSchemaFormOptions = {},
) {
  const { instanceRef, source, ...rest } = options
  const schema = reactive(isFunction(rawSchema) ? rawSchema() : rawSchema)

  const refVroElSchemaForm = instanceRef ?? ref<VroElSchemaFormInstance>()

  const { loading, trigger, error, data } = useAsyncTask(
    async () => {
      if (!refVroElSchemaForm.value) {
        return
      }
      try {
        await refVroElSchemaForm.value.validate()
      } catch {
        throw ''
      }
      const data = await refVroElSchemaForm.value.extractValues()
      await task?.(data as T)
    },
    { throwError: true, ...rest },
  )

  if (source) {
    banana.assignment(source, schema as any)
  }

  return {
    data,
    error,
    schema,
    refVroElSchemaForm,
    loading,
    trigger,
  }
}
