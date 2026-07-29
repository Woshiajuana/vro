<template>
  <demo-block title="基础用法">
    <el-table :data="tableData" border>
      <vro-el-table-column label="姓名" prop="name" />
      <vro-el-table-column label="状态" prop="status" :map="statusMap" />
      <vro-el-table-column label="金额" prop="amount" unit=" 元" align="right" />
    </el-table>
  </demo-block>

  <demo-block title="空值与图标">
    <el-table :data="tableData" border>
      <vro-el-table-column
        label="备注"
        prop="remark"
        placeholder="暂无备注"
        :line-clamp="2"
        :prefix-icon="{ name: Document }"
      />
      <vro-el-table-column
        label="评分"
        prop="score"
        :suffix-icon="{ name: Star, color: '#e6a23c' }"
      />
    </el-table>
  </demo-block>

  <demo-block title="自定义内容">
    <el-table :data="tableData" border>
      <vro-el-table-column label="姓名" prop="name">
        <template #default="{ row }">
          <el-tag>{{ row.name }}</el-tag>
        </template>
      </vro-el-table-column>

      <vro-el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
        </template>
      </vro-el-table-column>
    </el-table>
  </demo-block>
</template>

<script setup lang="ts">
  import { Document, Star } from '@element-plus/icons-vue'

  const statusMap = {
    enabled: '启用',
    disabled: '停用',
  }

  const tableData = [
    { name: '张三', status: 'enabled', amount: 12800, remark: '', score: 4 },
    {
      name: '李四',
      status: 'disabled',
      amount: 8600,
      remark: '重点跟进重点跟进重点跟进重点跟进重点跟进重点跟进',
      score: 5,
    },
  ]

  const handleEdit = (row: (typeof tableData)[number]) => {
    console.log('row => ', row)
  }
</script>
