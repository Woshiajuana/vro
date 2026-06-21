import { inject, type InjectionKey } from 'vue'

export const vroElSchemaFormDialogInjectionKey = Symbol() as InjectionKey<{
  confirm: (...args: any[]) => Promise<void>
  hide: (reason?: any) => Promise<void>
}>

export function useVroElSchemaFormDialogInstance() {
  return inject(vroElSchemaFormDialogInjectionKey, null)
}
