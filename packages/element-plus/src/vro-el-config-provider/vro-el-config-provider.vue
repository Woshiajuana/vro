<template>
  <slot> </slot>
</template>

<script setup lang="ts">
  import { merge } from '@daysnap/utils'
  import { computed, provide } from 'vue'

  import { LOCALE, localeContextKey } from '../locale'
  import { vroElConfigProviderProps } from './types'

  defineOptions({ name: 'VroElConfigProvider' })

  const props = defineProps(vroElConfigProviderProps)

  const locale = computed(() => merge({}, LOCALE, props.locale))

  provide(localeContextKey, locale)
</script>
