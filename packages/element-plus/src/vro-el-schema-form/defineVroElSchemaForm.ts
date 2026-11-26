import { isFunction } from '@daysnap/utils'

import type { VroElSchemaFormSchema } from './types'
import type { UseVroElSchemaFormSchema } from './useVroElSchemaForm'

export function defineVroElSchemaForm<T extends VroElSchemaFormSchema = VroElSchemaFormSchema>(
  schema: (() => T) | T,
): UseVroElSchemaFormSchema<T> {
  return isFunction(schema) ? schema() : schema
}
