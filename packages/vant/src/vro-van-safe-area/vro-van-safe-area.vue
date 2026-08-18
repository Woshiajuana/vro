<template>
  <div class="vro-van-safe-area">
    <span>vro-van-safe-area</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanSafeAreaProps } from './types'

  defineOptions({ name: 'VroVanSafeArea' })

  defineProps(vroVanSafeAreaProps)
</script>
