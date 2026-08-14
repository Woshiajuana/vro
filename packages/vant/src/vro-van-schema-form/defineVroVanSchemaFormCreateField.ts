import type { VroVanSchemaFormSchemaField } from './types'

export function defineVroVanSchemaFormCreateField<
  T extends (...args: any[]) => VroVanSchemaFormSchemaField,
>(generator: T) {
  return (options: Partial<VroVanSchemaFormSchemaField> = {}, ...args: Parameters<T>) => {
    return {
      ...generator(...args),
      ...options,
    } as VroVanSchemaFormSchemaField
  }
}
