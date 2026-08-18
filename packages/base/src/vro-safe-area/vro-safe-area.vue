<template>
  <div class="vro-safe-area">
    <span>vro-safe-area</span>
  </div>
</template>

<script setup lang="ts">
  import { vroSafeAreaProps } from './types'

  defineOptions({ name: 'VroSafeArea' })

  defineProps(vroSafeAreaProps)
</script>
