<template>
  <el-table-column class="vro-el-table-column">
    <template #default="scope">
      <slot>
        <div class="vro-el-pro-table-column-content">
          <VroElIcon v-if="prefixIcon" v-bind="prefixIcon" />
          <span class="vro-el-table-column-text"></span>
          <VroElIcon v-if="suffixIcon" v-bind="suffixIcon" />
        </div>
      </slot>
      <slot></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
  import { ElTableColumn } from 'element-plus'

  import { VroElIcon } from '../vro-el-icon'
  import { vroElTableColumnProps } from './types'

  defineOptions({ name: 'VroElTableColumn' })

  defineProps(vroElTableColumnProps)
</script>
