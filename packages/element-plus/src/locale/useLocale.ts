import { InjectionKey, Ref } from 'vue'

import { Locale } from './types'

export const localeContextKey: InjectionKey<Ref<Locale | undefined>> = Symbol('localeContextKey')

export function useLocale() {
  //
}
