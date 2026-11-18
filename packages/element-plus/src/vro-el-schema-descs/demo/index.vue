<template>
  <demo-block title="基础用法">
    <vro-el-schema-descs :data="data" :schema="baseSchema" />
  </demo-block>

  <demo-block title="枚举映射与单位">
    <vro-el-schema-descs :data="data" :schema="mapSchema" />
  </demo-block>

  <demo-block title="值处理">
    <vro-el-schema-descs :data="data" :schema="valueSchema" />
  </demo-block>

  <demo-block title="条件隐藏">
    <vro-el-schema-descs :data="data" :schema="hiddenSchema" />
  </demo-block>

  <demo-block title="自定义渲染">
    <vro-el-schema-descs :data="data" :schema="renderSchema" />
  </demo-block>

  <demo-block title="分组与动态 schema">
    <vro-el-schema-descs :data="data" :schema="groupSchema" />
    <vro-el-schema-descs :data="data" :schema="getSchema" />
  </demo-block>

  <demo-block title="自定义插槽">
    <vro-el-schema-descs :data="data" :schema="baseSchema">
      <template #item="{ item }">
        <span class="demo-schema-descs-value">{{ item.label }}：{{ item.value }}</span>
      </template>
    </vro-el-schema-descs>
  </demo-block>

  <demo-block title="透传属性">
    <vro-el-schema-descs
      :data="data"
      :schema="baseSchema"
      :desc-props="{ column: 2, direction: 'vertical' }"
      :item-props="{ align: 'center' }"
    />
  </demo-block>

  <demo-block title="命令式弹窗">
    <el-button type="primary" @click="showDescsDialog">查看用户详情</el-button>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElTag } from 'element-plus'
  import { h } from 'vue'

  import { type VroElSchemaDescsSchema } from '..'

  interface Detail {
    name: string
    status: string
    score: number
    tags: string[]
    createdAt: string
    enabledAt: string
    leaveAt: string
    remark: string
    company: {
      name: string
      address: string
    }
  }

  const data: Detail = {
    name: '张三',
    status: 'enabled',
    score: 0,
    tags: ['前端', '组件库'],
    createdAt: '2026-11-18 10:00:00',
    enabledAt: '2026-11-18 10:00:00',
    leaveAt: '',
    remark: '',
    company: {
      name: 'DaySnap',
      address: '杭州市西湖区',
    },
  }

  const statusMap: Record<string, { label: string; type: string }> = {
    enabled: { label: '已启用', type: 'success' },
    disabled: { label: '已停用', type: 'danger' },
  }

  const baseSchema: VroElSchemaDescsSchema<Detail> = [
    { label: '姓名', prop: 'name' },
    { label: '所属公司', prop: 'company.name' },
    { label: '公司地址', prop: 'company.address' },
    { label: '创建时间', prop: 'createdAt' },
  ]

  const mapSchema: VroElSchemaDescsSchema<Detail> = [
    { label: '状态', prop: 'status', map: statusMap },
    { label: '积分', prop: 'score', unit: '分' },
    { label: '备注', prop: 'remark' },
    { label: '离职时间', prop: 'leaveAt', defaultValue: '在职' },
  ]

  const valueSchema: VroElSchemaDescsSchema<Detail> = [
    {
      label: '姓名',
      prop: 'name',
      get: (value) => `${value}先生`,
    },
    {
      label: '标签',
      prop: 'tags',
      formatter: (value) => value.join('、'),
    },
    {
      label: '创建时间',
      prop: 'createdAt',
      formatter: (value, data) => `${data.name} / ${value}`,
    },
  ]

  const hiddenSchema: VroElSchemaDescsSchema<Detail> = [
    { label: '姓名', prop: 'name' },
    { label: '备注', prop: 'remark', hidden: true },
    {
      label: '离职时间',
      prop: 'leaveAt',
      hidden: (_, data) => data.status === 'enabled',
    },
  ]

  const renderSchema: VroElSchemaDescsSchema<Detail> = [
    {
      label: '状态',
      prop: 'status',
      map: statusMap,
      render: (value, data) => h(ElTag, { type: statusMap[data.status].type }, () => value),
    },
    {
      label: '积分',
      prop: 'score',
      unit: '分',
      render: (value) => h(ElTag, { type: 'warning' }, () => value),
    },
  ]

  const groupSchema: VroElSchemaDescsSchema<Detail> = [
    [
      { label: '姓名', prop: 'name' },
      { label: '状态', prop: 'status', map: statusMap },
    ],
    ({ status }) => [
      { label: '创建时间', prop: 'createdAt' },
      ...(status === 'enabled'
        ? [{ label: '启用时间', prop: 'enabledAt' }]
        : [{ label: '离职时间', prop: 'leaveAt' }]),
    ],
  ]

  const getSchema = (data: Detail): VroElSchemaDescsSchema<Detail> => [
    { label: `${data.name} 的公司`, prop: 'company.name' },
    { label: '公司地址', prop: 'company.address' },
  ]

  const openDescsDialog = createVroElSchemaDescsDialog<Detail>(baseSchema, {
    dialogProps: { title: '用户详情' },
    descProps: { column: 2 },
  })

  const showDescsDialog = () => {
    // 关闭弹窗时会 reject，这里忽略
    openDescsDialog(data).catch(() => {})
  }
</script>
