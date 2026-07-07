<template>
  <div class="vro-van-cell">
    <span>vro-van-cell</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanCellProps } from './types'

  defineOptions({ name: 'VroVanCell' })

  defineProps(vroVanCellProps)
</script>
