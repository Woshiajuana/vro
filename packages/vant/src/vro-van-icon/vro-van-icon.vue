<template>
  <div class="vro-van-icon">
    <span>vro-van-icon</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanIconProps } from './types'

  defineOptions({ name: 'VroVanIcon' })

  defineProps(vroVanIconProps)
</script>
