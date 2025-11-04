<template>
  <div class="vro-cell">
    <span>vro-cell</span>
  </div>
</template>

<script setup lang="ts">
  import { vroCellProps } from './types'

  defineOptions({ name: 'VroCell' })
  defineProps(vroCellProps)
</script>
