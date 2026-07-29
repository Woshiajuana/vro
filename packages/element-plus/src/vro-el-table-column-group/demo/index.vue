<template>
  <demo-block title="基础用法">
    <el-table :data="tableData" border>
      <vro-el-table-column-group :columns="columns" />
    </el-table>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElTag } from 'element-plus'
  import { h, ref } from 'vue'

  import { useVroElTableColumnGroup } from '../useVroElTableColumnGroup'

  interface Row {
    name: string
    status: 'enabled' | 'disabled'
    amount: number
    remark?: string
  }

  const tableData: Row[] = [
    { name: '张三', status: 'enabled', amount: 12800, remark: '重点客户，优先跟进' },
    { name: '李四', status: 'disabled', amount: 8600 },
  ]

  const showRemark = ref(true)

  const statusMap = {
    enabled: '启用',
    disabled: '停用',
  }

  const columns = useVroElTableColumnGroup<Row>([
    { type: 'index', label: '序号', width: 72 },
    { label: '姓名', prop: 'name', minWidth: 120 },
    { label: '状态', prop: 'status', width: 120, map: statusMap },
    {
      label: '状态标签',
      prop: 'status',
      width: 120,
      renderContent: ({ row }) =>
        h(
          ElTag,
          { type: row.status === 'enabled' ? 'success' : 'info' },
          () => statusMap[row.status],
        ),
    },
    {
      label: '金额',
      prop: 'amount',
      unit: ' 元',
      align: 'right',
      width: 140,
    },
    {
      label: '备注',
      prop: 'remark',
      placeholder: '暂无备注',
      lineClamp: 1,
      hidden: () => !showRemark.value,
      minWidth: 160,
    },
    {
      is: 'VroElTableActionsColumn',
      width: 180,
      actions: (row) => [
        {
          label: '编辑',
          disabled: row.status === 'disabled',
          onAction: () => {
            console.log('edit => ', row)
          },
        },
        {
          label: row.status === 'enabled' ? '停用' : '启用',
          type: row.status === 'enabled' ? 'warning' : 'success',
          onAction: () => {
            console.log('toggle => ', row)
          },
        },
      ],
      moreActions: [
        {
          label: '删除',
          type: 'danger',
          onAction: (row) => {
            console.log('delete => ', row)
          },
        },
      ],
    },
  ])
</script>
