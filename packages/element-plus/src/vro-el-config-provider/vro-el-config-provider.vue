<template>
  <slot> </slot>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { provideVroElConfig } from './config'
  import { vroElConfigProviderProps } from './types'

  defineOptions({ name: 'VroElConfigProvider' })

  const props = defineProps(vroElConfigProviderProps)

  const config = computed(() => ({
    locale: props.locale,
  }))

  provideVroElConfig(config, props)
</script>
