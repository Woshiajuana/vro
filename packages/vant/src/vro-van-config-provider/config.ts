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
import type { VroVanConfigProviderProps, VroVanLocale } from './types'

export interface VroVanConfig {
  locale?: VroVanLocale | Locale
}

export interface VroVanResolvedConfig {
  locale: Locale
}

export const vroVanConfigContextKey: InjectionKey<ComputedRef<VroVanResolvedConfig>> =
  Symbol('vroVanConfigContextKey')

const globalConfig = reactive<VroVanConfig>({})

export function setVroVanGlobalConfig(config: VroVanConfig = {}) {
  merge(globalConfig, config)
}

export function useVroVanGlobalConfig() {
  return computed<VroVanResolvedConfig>(
    () => merge({}, { locale: zhCN }, globalConfig) as VroVanResolvedConfig,
  )
}

export function useVroVanConfig() {
  const injectedConfig = inject(vroVanConfigContextKey, undefined)
  const globalConfig = useVroVanGlobalConfig()

  return computed<VroVanResolvedConfig>(() => injectedConfig?.value ?? globalConfig.value)
}

export function provideVroVanConfig(
  config: MaybeRef<VroVanConfig>,
  options: MaybeRef<Partial<Pick<VroVanConfigProviderProps, 'global'>>> = {},
) {
  const parentConfig = inject(vroVanConfigContextKey, undefined)
  const globalConfig = useVroVanGlobalConfig()

  const mergedConfig = computed<VroVanResolvedConfig>(
    () =>
      merge(
        {},
        globalConfig.value,
        parentConfig?.value ?? {},
        unref(config),
      ) as VroVanResolvedConfig,
  )

  provide(vroVanConfigContextKey, mergedConfig)

  watchEffect(() => {
    if (unref(options).global) {
      setVroVanGlobalConfig(unref(config))
    }
  })

  return mergedConfig
}
