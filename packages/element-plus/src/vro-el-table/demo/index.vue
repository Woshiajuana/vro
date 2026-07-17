<template>
  <demo-block title="基础用法">
    <vro-el-table v-bind="attrs" @request="trigger" @selection-change="handleSelectionChange">
      <template #title>
        <h2 class="demo-table-title">用户列表</h2>
      </template>

      <template #actions>
        <el-button type="primary" plain @click="trigger({ currentPage: 1 })">重新加载</el-button>
      </template>
    </vro-el-table>

    <div class="demo-table-selection">已选 {{ selectionCount }} 项</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElButton, ElTableColumn, ElTag } from 'element-plus'
  import { h, ref } from 'vue'

  import type { VroElSchemaFormSchema } from '../../vro-el-schema-form'
  import type { VroElTableColumnGroupColumn } from '../../vro-el-table-column-group'
  import { useVroElTable } from '..'

  interface User {
    name: string
    status: 'enabled' | 'disabled'
    amount: number
  }

  const source: User[] = [
    { name: '张三', status: 'enabled', amount: 12800 },
    { name: '李四', status: 'disabled', amount: 8600 },
    { name: '王五', status: 'enabled', amount: 23600 },
  ]

  const selectionCount = ref(0)

  const schema: VroElSchemaFormSchema = {
    keyword: {
      label: '关键词',
      value: '',
      is: 'ElInput',
      props: {
        placeholder: '请输入姓名',
      },
    },
    status: {
      label: '状态',
      value: '',
      is: 'VroElSelect',
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  }

  const columns: VroElTableColumnGroupColumn[] = [
    { is: ElTableColumn, type: 'selection', width: 48 },
    { is: ElTableColumn, label: '姓名', prop: 'name' },
    {
      is: ElTableColumn,
      label: '状态',
      prop: 'status',
      width: 120,
      formatter: (row: User) =>
        h(ElTag, { type: row.status === 'enabled' ? 'success' : 'info' }, () =>
          row.status === 'enabled' ? '启用' : '停用',
        ),
    },
    {
      is: ElTableColumn,
      label: '金额',
      prop: 'amount',
      align: 'right',
      formatter: (row: User) => `¥${row.amount.toLocaleString()}`,
    },
  ]

  const { attrs, trigger } = useVroElTable(
    schema,
    columns,
    async ([currentPage, pageSize], query) => {
      const list = source.filter((item) => {
        const keywordMatched = !query.keyword || item.name.includes(query.keyword)
        const statusMatched = !query.status || item.status === query.status
        return keywordMatched && statusMatched
      })
      const start = (currentPage - 1) * pageSize
      return [list.slice(start, start + pageSize), list.length]
    },
  )

  const handleSelectionChange = (selection: User[]) => {
    selectionCount.value = selection.length
  }
</script>

<style lang="scss" scoped>
  .demo-table-title {
    margin: 0;
    font-size: 16px;
  }

  .demo-table-selection {
    margin-top: 12px;
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
</style>
