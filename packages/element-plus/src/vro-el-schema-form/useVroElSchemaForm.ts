import banana from '@daysnap/banana'
import { isFunction } from '@daysnap/utils'
import { useAsyncTask } from '@vrojs/use'
import { reactive, type Ref, ref } from 'vue'

import type { VroElSchemaFormInstance } from '.'
import type { VroElSchemaFormSchema } from './types'

export function useVroElSchemaForm<T extends (data: any) => Promise<any>>(
  rawSchema: (() => VroElSchemaFormSchema) | VroElSchemaFormSchema,
  task?: T,
  options: {
    initialValue?: Record<string, any>
    instanceRef?: Ref<VroElSchemaFormInstance | null>
  } = {},
) {
  const { instanceRef, initialValue } = options
  const schema = reactive(isFunction(rawSchema) ? rawSchema() : rawSchema)

  const refVroElSchemaForm = instanceRef ?? ref<VroElSchemaFormInstance>()

  const { loading, trigger } = useAsyncTask(
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
      await task?.(data)
    },
    { throwError: true },
  )

  if (initialValue) {
    banana.assignment(initialValue, schema as any)
  }

  return {
    schema,
    refVroElSchemaForm,
    loading,
    trigger,
  }
}
