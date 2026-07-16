<template>
  <div class="vro-el-table">
    <VroElSchemaFilter
      v-if="filterable"
      v-bind="filterProps"
      :loading="loading"
      class="vro-el-table-filter"
      @query="$emit('request', { query: $event, currentPage: 1 })"
    />

    <div class="vro-el-table-inner">
      <div v-if="showHeader" class="vro-el-table-header">
        <slot name="title"></slot>
        <div class="vro-el-table-actions">
          <ElButton
            v-if="showRefresh"
            plain
            :icon="RefreshRight"
            :loading="loading"
            @click="$emit('request')"
          >
            刷新
          </ElButton>
          <slot name="actions"></slot>
        </div>
      </div>

      <div v-loading="loading" class="vro-el-table-content">
        <ElTable
          width="100%"
          table-layout="fixed"
          v-bind="tableProps"
          :data="data"
          ref="refElTable"
          @selection-change="$emit('selection-change', $event)"
        >
          <slot name="content-prefix"></slot>

          <VroElTableColumnGroup v-if="columns.length" :columns="columns" />

          <slot></slot>
        </ElTable>
      </div>

      <ElPagination
        v-if="pageable"
        class="vro-el-table-pagination"
        layout="total, prev, pager, next, sizes, jumper"
        background
        size="small"
        :page-sizes="[10, 20, 50, 100]"
        v-bind="paginationProps"
        @update:current-page="$emit('request', { currentPage: $event })"
        @update:page-size="$emit('request', { pageSize: $event, currentPage: 1 })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { isEmptyObject } from '@daysnap/utils'
  import { RefreshRight } from '@element-plus/icons-vue'
  import { ElButton, ElPagination, ElTable } from 'element-plus'
  import { computed, useTemplateRef } from 'vue'

  import { VroElSchemaFilter } from '../vro-el-schema-filter'
  import { VroElTableColumnGroup } from '../vro-el-table-column-group'
  import { vroElTableProps } from './types'

  defineOptions({ name: 'VroElTable' })

  defineEmits(['request', 'selection-change'])

  const props = defineProps(vroElTableProps)

  const refElTable = useTemplateRef('refElTable')

  const filterable = computed(() => {
    const { filterable, filterProps } = props
    return filterable && filterProps && filterProps.schema && !isEmptyObject(filterProps.schema)
  })

  defineExpose({
    get tableInstance() {
      return refElTable.value!
    },
  })
</script>
