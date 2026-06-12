<template>
  <slot> </slot>
</template>

<script setup lang="ts">
  import { merge } from '@daysnap/utils'
  import { computed, provide } from 'vue'

  import { localeContextKey, zhCN } from '../locale'
  import { vroElConfigProviderProps } from './types'

  defineOptions({ name: 'VroElConfigProvider' })

  const props = defineProps(vroElConfigProviderProps)

  const locale = computed(() => merge({}, zhCN, props.locale))

  provide(localeContextKey, locale)
</script>
