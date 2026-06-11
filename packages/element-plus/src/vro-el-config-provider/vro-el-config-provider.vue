<template>
  <slot> </slot>
</template>

<script setup lang="ts">
  import { provide } from 'vue'

  import { vroElConfigInjectionKey } from './injection'
  import { vroElConfigProviderProps } from './types'

  defineOptions({ name: 'VroElConfigProvider' })

  const props = defineProps(vroElConfigProviderProps)

  provide(vroElConfigInjectionKey, props)
</script>
