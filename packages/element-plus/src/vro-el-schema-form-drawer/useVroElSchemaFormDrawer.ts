import banana from '@daysnap/banana'
import { getCurrentInstance, type Ref, ref } from 'vue'

import type { VroElSchemaFormSchema, VroElSchemaFormSchemaField } from '../vro-el-schema-form'
import { showVroElSchemaFormDrawer } from './function-call'

export interface UseVroElSchemaFormDrawerOptions<S extends VroElSchemaFormSchema> {
  instanceRef?: Ref<any>
  onGenerate?: (schema: S, ...args: any[]) => void
  onSuccess?: (schema: S, ...args: any[]) => void
}

export interface UseVroElSchemaFormDrawerInstance {
  show: typeof showVroElSchemaFormDrawer
}

export function useVroElSchemaFormDrawer<
  T extends VroElSchemaFormSchema,
  S extends VroElSchemaFormSchema = { [P in keyof T]: VroElSchemaFormSchemaField },
>(
  generator: () => T | Promise<T>,
  task: (schema: S, instance: UseVroElSchemaFormDrawerInstance, ...args: any[]) => Promise<any>,
  options: UseVroElSchemaFormDrawerOptions<S> = {},
) {
  const { onGenerate, onSuccess, instanceRef } = options

  const schema = ref<S>()

  const instance = getCurrentInstance()

  const trigger = async (...args: any[]) => {
    schema.value = (await generator()) as unknown as S
    if (args[0]) {
      banana.assignment(args[0], schema.value as any)
    }

    onGenerate?.(schema.value as any, ...args)

    await task(
      schema.value,
      instanceRef?.value ?? {
        show: (props, appContext) =>
          showVroElSchemaFormDrawer(props, appContext ?? instance?.appContext),
      },
      ...args,
    )

    onSuccess?.(schema.value as any, ...args)
  }

  return [schema, trigger] as const
}
