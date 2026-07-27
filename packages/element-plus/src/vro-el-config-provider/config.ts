import { merge } from '@daysnap/utils'
import {
  computed,
  type ComputedRef,
  inject,
  type InjectionKey,
  type MaybeRef,
  provide,
  reactive,
  unref,
  watchEffect,
} from 'vue'

import zhCN from '../locale/lang/zh-cn'
import type { Locale } from '../locale/types'
import type { VroElConfigProviderProps, VroElLocale } from './types'

export interface VroElConfig {
  locale?: VroElLocale | Locale
}

export interface VroElResolvedConfig {
  locale: Locale
}

export const vroElConfigContextKey: InjectionKey<ComputedRef<VroElResolvedConfig>> =
  Symbol('vroElConfigContextKey')

const globalConfig = reactive<VroElConfig>({})

export function setVroElGlobalConfig(config: VroElConfig = {}) {
  merge(globalConfig, config)
}

export function useVroElGlobalConfig() {
  return computed<VroElResolvedConfig>(
    () => merge({}, { locale: zhCN }, globalConfig) as VroElResolvedConfig,
  )
}

export function useVroElConfig() {
  const injectedConfig = inject(vroElConfigContextKey, undefined)
  const globalConfig = useVroElGlobalConfig()

  return computed<VroElResolvedConfig>(() => injectedConfig?.value ?? globalConfig.value)
}

export function provideVroElConfig(
  config: MaybeRef<VroElConfig>,
  options: MaybeRef<Partial<Pick<VroElConfigProviderProps, 'global'>>> = {},
) {
  const parentConfig = inject(vroElConfigContextKey, undefined)
  const globalConfig = useVroElGlobalConfig()

  const mergedConfig = computed<VroElResolvedConfig>(
    () =>
      merge(
        {},
        globalConfig.value,
        parentConfig?.value ?? {},
        unref(config),
      ) as VroElResolvedConfig,
  )

  provide(vroElConfigContextKey, mergedConfig)

  watchEffect(() => {
    if (unref(options).global) {
      setVroElGlobalConfig(unref(config))
    }
  })

  return mergedConfig
}
