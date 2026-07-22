<template>
  <div class="vro-van-cell-group">
    <span>vro-van-cell-group</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanCellGroupProps } from './types'

  defineOptions({ name: 'VroVanCellGroup' })

  defineProps(vroVanCellGroupProps)
</script>
