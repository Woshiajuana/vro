import { computed } from 'vue'

import { useVroElConfig } from '../vro-el-config-provider/config'
import zhCN from './lang/zh-cn'
import type { TranslatePair } from './types'

export function useLocale() {
  const config = useVroElConfig()

  const locale = computed(() => config.value.locale ?? zhCN)

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
