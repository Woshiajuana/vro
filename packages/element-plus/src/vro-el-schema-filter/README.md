# VroElSchemaFilter

### 介绍

基于 `VroElSchemaForm` 的筛选表单组件。组件会根据 `schema` 渲染筛选项，并内置搜索、重置按钮，适合列表页、表格页的查询条件区域。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-schema-filter
    :schema="schema"
    :form-props="{ labelWidth: '90px' }"
    @query="handleQuery"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { VroElSchemaFormSchema } from '@vrojs/element-plus'

  const schema = ref<VroElSchemaFormSchema>({
    keyword: {
      label: '关键词',
      value: '',
      is: 'ElInput',
      props: {
        placeholder: '请输入关键词',
      },
    },
    status: {
      label: '状态',
      value: '',
      defaultValue: '',
      is: 'VroElSelect',
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  })

  const handleQuery = (value) => {
    console.log(value)
  }

  const handleReset = () => {
    console.log('reset')
  }
</script>
```

### 重置默认值

字段存在 `defaultValue` 时，点击重置会恢复为 `defaultValue`；否则会根据当前值类型重置为空字符串、空数组或空对象。

```ts
const schema = {
  type: {
    label: '类型',
    value: 'all',
    defaultValue: 'all',
    is: 'VroElRadioGroup',
    options: [
      { label: '全部', value: 'all' },
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'company' },
    ],
  },
}
```

### 自定义按钮区域

默认插槽会追加到搜索、重置按钮后面。

```html
<vro-el-schema-filter :schema="schema">
  <el-button>导出</el-button>
</vro-el-schema-filter>
```

## API

### 属性 Props

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElSchemaFilterProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>default</td>
      <td>搜索、重置按钮后的自定义内容</td>
    </tr>
  </tbody>
</table>

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>参数</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>query</td>
      <td>value</td>
      <td>点击搜索或回车查询时触发，参数为过滤空值后的表单值</td>
    </tr>
    <tr>
      <td>reset</td>
      <td>-</td>
      <td>点击重置时触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaFilter, vroElSchemaFilterProps } from '.'
  import { parseType } from '../utils'
</script>
