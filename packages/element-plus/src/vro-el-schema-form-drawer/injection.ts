import { inject, type InjectionKey } from 'vue'

export const vroElSchemaFormDrawerInjectionKey = Symbol() as InjectionKey<{
  confirm: (...args: any[]) => Promise<void>
  hide: (reason?: any) => Promise<void>
}>

export function useVroElSchemaFormDrawerInstance() {
  return inject(vroElSchemaFormDrawerInjectionKey, null)
}
