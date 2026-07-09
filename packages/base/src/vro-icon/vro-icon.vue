<template>
  <div class="vro-icon">
    <span>vro-icon</span>
  </div>
</template>

<script setup lang="ts">
  import { vroIconProps } from './types'

  defineOptions({ name: 'VroIcon' })

  defineProps(vroIconProps)
</script>
