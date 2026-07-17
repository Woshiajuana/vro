<template>
  <demo-block title="基础用法">
    <el-table :data="tableData" border>
      <vro-el-table-column-group :columns="columns" />
    </el-table>
  </demo-block>

  <demo-block title="隐藏列">
    <el-table :data="tableData" border>
      <vro-el-table-column-group :columns="hiddenColumns" />
    </el-table>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElButton, ElTable, ElTableColumn, ElTag } from 'element-plus'
  import { h, ref } from 'vue'

  import type { VroElTableColumnGroupColumn } from '../types'
  import { vroElTableColumnGroupColumnManager } from '../vroElTableColumnGroupColumnManager'

  const tableData = [
    { name: '张三', status: 'enabled', amount: 12800 },
    { name: '李四', status: 'disabled', amount: 8600 },
  ]

  const showAmount = ref(false)

  vroElTableColumnGroupColumnManager
    .add('selection', ElTableColumn, {
      type: 'selection',
      width: 48,
    })
    .add('status', ElTableColumn, {
      label: '状态',
      prop: 'status',
      width: 120,
      formatter: (row: (typeof tableData)[number]) => {
        return h(ElTag, { type: row.status === 'enabled' ? 'success' : 'info' }, () =>
          row.status === 'enabled' ? '启用' : '停用',
        )
      },
    })

  const columns: VroElTableColumnGroupColumn[] = [
    { is: 'selection' },
    { is: ElTableColumn, label: '姓名', prop: 'name' },
    { is: 'status' },
    {
      is: ElTableColumn,
      label: '金额',
      prop: 'amount',
      align: 'right',
      formatter: (row) => `¥${row.amount.toLocaleString()}`,
    },
  ]

  const hiddenColumns: VroElTableColumnGroupColumn[] = [
    { is: ElTableColumn, label: '姓名', prop: 'name' },
    {
      is: ElTableColumn,
      label: '金额',
      prop: 'amount',
      align: 'right',
      hidden: () => !showAmount.value,
      formatter: (row) => `¥${row.amount.toLocaleString()}`,
    },
    {
      is: ElTableColumn,
      label: '操作',
      width: 120,
      formatter: () =>
        h(
          ElButton,
          {
            link: true,
            type: 'primary',
            onClick: () => {
              showAmount.value = !showAmount.value
            },
          },
          () => (showAmount.value ? '隐藏金额' : '显示金额'),
        ),
    },
  ]
</script>
