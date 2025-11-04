<template>
  <div class="vro-cell-group">
    <span>vro-cell-group</span>
  </div>
</template>

<script setup lang="ts">
  import { vroCellGroupProps } from './types'

  defineOptions({ name: 'VroCellGroup' })
  defineProps(vroCellGroupProps)
</script>
