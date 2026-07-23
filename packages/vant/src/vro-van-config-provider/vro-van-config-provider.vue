<template>
  <slot></slot>
</template>

<script setup lang="ts">
  import { merge } from '@daysnap/utils'
  import { computed, provide } from 'vue'

  import { localeContextKey, zhCN } from '../locale'
  import { vroVanConfigProviderProps } from './types'

  defineOptions({ name: 'VroVanConfigProvider' })

  const props = defineProps(vroVanConfigProviderProps)

  const locale = computed(() => merge({}, zhCN, props.locale))

  provide(localeContextKey, locale)
</script>
