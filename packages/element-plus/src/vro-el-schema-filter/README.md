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
    :loading="loading"
    @query="handleQuery"
    @reset="handleReset"
  >
    <el-button @click="handleExport">导出</el-button>
  </vro-el-schema-filter>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { VroElSchemaFormSchema } from '@vrojs/element-plus'

  const loading = ref(false)

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
      resetValue: '',
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

  const handleExport = () => {
    console.log('export')
  }
</script>
```

### 重置默认值

字段存在 `resetValue` 时，点击重置会恢复为 `resetValue`；否则会根据当前值类型重置为空字符串、空数组或空对象。

```ts
const schema = {
  type: {
    label: '类型',
    value: 'all',
    resetValue: 'all',
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

### 字段插槽

除默认插槽外，其它具名插槽会转发给内部 `VroElSchemaForm`，可配合 schema 字段的 `slots` 和 `itemSlots` 使用。

```html
<vro-el-schema-filter :schema="schema">
  <template #prepend>
    <span>https://</span>
  </template>
</vro-el-schema-filter>
```

```ts
const schema = {
  website: {
    label: '网址',
    value: '',
    is: 'ElInput',
    slots: {
      prepend: 'prepend',
    },
  },
}
```

### 标签宽度

`labelWidth` 会合并到内部 `formProps`，如果同时传入 `formProps.labelWidth`，以 `formProps.labelWidth` 为准。

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
    <tr>
      <td>schema 字段 slots 配置中的 key</td>
      <td>转发给内部 VroElSchemaForm 的字段组件插槽</td>
    </tr>
    <tr>
      <td>schema 字段 itemSlots 配置中的 key</td>
      <td>转发给内部 VroElSchemaForm 的 ElFormItem 插槽</td>
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

### 样式变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-el-schema-filter-padding</td>
      <td>0 16px 16px</td>
    </tr>
    <tr>
      <td>--vro-el-schema-filter-background</td>
      <td>var(--el-bg-color)</td>
    </tr>
    <tr>
      <td>--vro-el-schema-filter-col-margin-top</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaFilter, vroElSchemaFilterProps } from '.'
  import { parseType } from '../utils'
</script>
