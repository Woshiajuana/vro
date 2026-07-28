<template>
  <div class="vro-el-table-actions-column">
    <span>vro-el-table-actions-column</span>
  </div>
</template>

<script setup lang="ts">
  import { vroElTableActionsColumnProps } from './types'

  defineOptions({ name: 'VroElTableActionsColumn' })

  defineProps(vroElTableActionsColumnProps)
</script>
