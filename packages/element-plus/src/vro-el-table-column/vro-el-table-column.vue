<template>
  <el-table-column class="vro-el-table-column">
    <span>vro-el-table-column</span>
  </el-table-column>
</template>

<script setup lang="ts">
  import { ElTableColumn } from 'element-plus'

  import { vroElTableColumnProps } from './types'

  defineOptions({ name: 'VroElTableColumn' })

  defineProps(vroElTableColumnProps)
</script>
