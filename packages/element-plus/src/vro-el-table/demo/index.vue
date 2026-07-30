<template>
  <demo-block title="基础用法">
    <vro-el-table v-bind="tableProps" @request="trigger" @selection-change="handleSelectionChange">
      <template #title>
        <h2 class="demo-table-title">用户列表</h2>
      </template>

      <template #actions>
        <el-button plain @click="showRemark = !showRemark">
          {{ showRemark ? '隐藏备注' : '显示备注' }}
        </el-button>
        <el-button type="primary" plain @click="trigger({ currentPage: 1 })">重新加载</el-button>
      </template>
    </vro-el-table>

    <div class="demo-table-selection">已选 {{ selectionCount }} 项</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { sleep } from '@daysnap/utils'
  import { Star } from '@element-plus/icons-vue'
  import { ElButton, ElTag } from 'element-plus'
  import { h, ref } from 'vue'

  import { createUseVroElTable } from '../createUseVroElTable'

  interface User {
    name: string
    status: 'enabled' | 'disabled'
    amount: number
    score: number
    remark?: string
  }

  const source: User[] = [
    {
      name: '张三',
      status: 'enabled',
      amount: 12800,
      score: 92,
      remark: '重点客户，最近有追加采购意向，需要优先跟进。',
    },
    { name: '李四', status: 'disabled', amount: 8600, score: 76 },
    {
      name: '王五',
      status: 'enabled',
      amount: 23600,
      score: 88,
      remark: '合同已进入复核阶段，等待财务确认付款周期。',
    },
  ]

  const selectionCount = ref(0)
  const showRemark = ref(true)
  const statusMap = {
    enabled: '启用',
    disabled: '停用',
  }

  const { tableProps, trigger, schema } = createUseVroElTable<User>()(
    {
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
    },
    [
      { type: 'selection', width: 48 },
      { type: 'index', label: '序号', width: 72 },
      { label: '姓名', prop: 'name', minWidth: 120 },
      { label: '状态', prop: 'status', width: 100, map: statusMap },
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
        formatter: (row) => row.amount.toLocaleString(),
      },
      {
        label: '评分',
        prop: 'score',
        width: 100,
        suffixIcon: { name: Star, color: '#e6a23c' },
      },
      {
        label: '备注',
        prop: 'remark',
        placeholder: '暂无备注',
        lineClamp: 1,
        hidden: () => !showRemark.value,
        minWidth: 180,
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
    ],
    async ([currentPage, pageSize], query) => {
      await sleep(400)
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
