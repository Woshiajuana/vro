<template>
  <div class="vro-van-safe-area">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { vroVanSafeAreaProps } from './types'

  defineOptions({ name: 'VroVanSafeArea' })

  defineProps(vroVanSafeAreaProps)
</script>
