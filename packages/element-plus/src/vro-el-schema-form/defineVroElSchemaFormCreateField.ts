import type { VroElSchemaFormSchemaField } from './types'

export function defineVroElSchemaFormCreateField<
  T extends (...args: any[]) => VroElSchemaFormSchemaField,
>(generator: T) {
  return (options: Partial<VroElSchemaFormSchemaField> = {}, ...args: Parameters<T>) => {
    return {
      ...generator(...args),
      ...options,
    } as VroElSchemaFormSchemaField
  }
}
