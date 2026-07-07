<template>
  <div class="vro-van-cell"></div>
</template>

<script setup lang="ts">
  import { vroVanCellProps } from './types'

  defineOptions({ name: 'VroVanCell' })

  defineProps(vroVanCellProps)
</script>
