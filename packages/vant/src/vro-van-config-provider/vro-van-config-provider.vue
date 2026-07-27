<template>
  <slot></slot>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { provideVroVanConfig } from './config'
  import { vroVanConfigProviderProps } from './types'

  defineOptions({ name: 'VroVanConfigProvider' })

  const props = defineProps(vroVanConfigProviderProps)

  const config = computed(() => ({
    locale: props.locale,
  }))

  provideVroVanConfig(config, props)
</script>
