<template>
  <div class="vro-config-provider">
    <span>vro-config-provider</span>
  </div>
</template>

<script setup lang="ts">
  import { vroConfigProviderProps } from './types'

  defineOptions({ name: 'VroConfigProvider' })

  defineProps(vroConfigProviderProps)
</script>
