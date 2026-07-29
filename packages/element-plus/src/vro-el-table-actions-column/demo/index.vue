<template>
  <demo-block title="基础用法">
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="状态" prop="status" />
      <vro-el-table-actions-column :actions="baseActions" width="160" />
    </el-table>
  </demo-block>

  <demo-block title="更多操作">
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="状态" prop="status" />
      <vro-el-table-actions-column
        :actions="baseActions"
        :more-actions="moreActions"
        more-trigger="click"
        width="220"
      />
    </el-table>
  </demo-block>

  <demo-block title="禁用与隐藏">
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="状态" prop="status" />
      <vro-el-table-actions-column :actions="stateActions" width="180" />
    </el-table>
  </demo-block>

  <demo-block title="按行动态操作">
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="状态" prop="status" />
      <vro-el-table-actions-column :actions="dynamicActions" width="180" />
    </el-table>
  </demo-block>

  <demo-block title="自定义内容">
    <el-table :data="tableData" border>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="状态" prop="status" />
      <vro-el-table-actions-column :actions="baseActions" :more-actions="moreActions" width="220">
        <template #action="{ action }">
          {{ action.label }}
        </template>

        <template #more-action="{ action }">
          {{ action.label }}
        </template>
      </vro-el-table-actions-column>
    </el-table>
  </demo-block>
</template>

<script setup lang="ts">
  import type { VroElTableActionsColumnAction } from '..'

  interface Row {
    name: string
    status: string
  }

  const tableData: Row[] = [
    { name: '张三', status: '启用' },
    { name: '李四', status: '停用' },
  ]

  const baseActions: VroElTableActionsColumnAction<Row>[] = [
    {
      label: '编辑',
      onAction: (row) => {
        console.log('edit => ', row)
      },
    },
    {
      label: '详情',
      type: 'success',
      onAction: (row) => {
        console.log('detail => ', row)
      },
    },
  ]

  const moreActions: VroElTableActionsColumnAction<Row>[] = [
    {
      label: '复制',
      onAction: (row) => {
        console.log('copy => ', row)
      },
    },
    {
      label: '删除',
      type: 'danger',
      onAction: (row) => {
        console.log('delete => ', row)
      },
    },
  ]

  const stateActions: VroElTableActionsColumnAction<Row>[] = [
    {
      label: '编辑',
      disabled: true,
    },
    {
      label: '启用',
      hidden: (row) => row.status === '启用',
    },
    {
      label: '停用',
      type: 'warning',
      hidden: (row) => row.status === '停用',
    },
  ]

  const dynamicActions = (row: Row): VroElTableActionsColumnAction<Row>[] => {
    return [
      {
        label: '编辑',
        disabled: row.status === '停用',
      },
      {
        label: row.status === '启用' ? '停用' : '启用',
        type: row.status === '启用' ? 'warning' : 'success',
        onAction: () => {
          console.log('toggle => ', row)
        },
      },
    ]
  }
</script>
