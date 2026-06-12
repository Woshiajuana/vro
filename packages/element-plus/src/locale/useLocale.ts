import { computed, inject, type InjectionKey, type Ref } from 'vue'

import zhCN from './lang/zh-cn'
import type { Locale, TranslatePair } from './types'

export const localeContextKey: InjectionKey<Ref<Locale | undefined>> = Symbol('localeContextKey')

export function useLocale() {
  const injectedLocale = inject(localeContextKey, undefined)

  const locale = computed(() => injectedLocale?.value ?? zhCN)

  const t = (path: string, option?: Record<string, string | number>) => {
    const value = get(locale.value.el, path)

    if (typeof value !== 'string') {
      return path
    }

    if (!option) {
      return value
    }

    return value.replace(/\{(\w+)\}/g, (_, key) => `${option[key] ?? `{${key}}`}`)
  }

  return {
    locale,
    lang: computed(() => locale.value.name),
    t,
  }
}

function get(source: TranslatePair, path: string) {
  return path.split('.').reduce<TranslatePair[string] | undefined>((res, key) => {
    if (res && typeof res === 'object' && !Array.isArray(res)) {
      return res[key]
    }

    return undefined
  }, source)
}
