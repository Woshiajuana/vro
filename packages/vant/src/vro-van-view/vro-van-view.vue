<template>
  <div class="vro-van-view">
    <span>vro-van-view</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanViewProps } from './types'

  defineOptions({ name: 'VroVanView' })

  defineProps(vroVanViewProps)
</script>
