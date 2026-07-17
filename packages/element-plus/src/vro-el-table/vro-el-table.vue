<template>
  <div class="vro-el-table">
    <vro-el-schema-filter
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
          <el-button
            v-if="showRefresh"
            plain
            :icon="RefreshRight"
            :loading="loading"
            @click="$emit('request')"
          >
            {{ t('table.refresh') }}
          </el-button>
          <slot name="actions"></slot>
        </div>
      </div>

      <div v-loading="loading" class="vro-el-table-content">
        <el-table
          ref="refElTable"
          width="100%"
          table-layout="fixed"
          v-bind="tableProps"
          :data="data"
          @selection-change="$emit('selection-change', $event)"
        >
          <slot name="content-prefix"></slot>

          <vro-el-table-column-group v-if="columns.length" :columns="columns" />

          <slot></slot>
        </el-table>
      </div>

      <el-pagination
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

  import { useLocale } from '../locale'
  import { VroElSchemaFilter } from '../vro-el-schema-filter'
  import { VroElTableColumnGroup } from '../vro-el-table-column-group'
  import { vroElTableProps, type VroElTableRequestPayload } from './types'

  defineOptions({ name: 'VroElTable' })

  defineEmits<{
    request: [payload?: VroElTableRequestPayload]
    'selection-change': [selection: any[]]
  }>()

  const props = defineProps(vroElTableProps)
  const { t } = useLocale()

  const refElTable = useTemplateRef('refElTable')

  const filterable = computed(() => {
    const { filterable, filterProps } = props
    return filterable && filterProps && filterProps.schema && !isEmptyObject(filterProps.schema)
  })

  defineExpose({
    get elTable() {
      return refElTable.value!
    },
  })
</script>
