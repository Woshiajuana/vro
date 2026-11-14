# VroElTable

### 介绍

基于 Element Plus Table、Pagination 和 VroElSchemaFilter 组合的业务表格组件。支持筛选、刷新、分页、列配置、加载态和常用插槽，适合配合 `useVroElTable` 管理请求状态。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-table
    :columns="columns"
    :data="data"
    :pagination="{ currentPage: 1, pageSize: 10, total: 100 }"
    @request="handleRequest"
  />
</template>

<script setup lang="ts">
  import { ElTableColumn } from 'element-plus'
  import type { VroElTableColumnGroupColumn, VroElTableRequestPayload } from '@vrojs/element-plus'

  const data = [{ name: '张三', amount: 12800 }]

  const columns: VroElTableColumnGroupColumn[] = [
    { is: ElTableColumn, label: '姓名', prop: 'name' },
    { is: ElTableColumn, label: '金额', prop: 'amount', align: 'right' },
  ]

  const handleRequest = (payload?: VroElTableRequestPayload) => {
    console.log(payload)
  }
</script>
```

`pagination` 只接收分页状态（`currentPage`、`pageSize`、`total`）；其余 ElPagination 属性（`layout`、`pageSizes`、`background`、`size` 等）继续用 `paginationProps` 传。两者会合并，同名字段以 `pagination` 为准。

### 筛选表格

传入 `schema` 后会展示筛选区（`filterable` 为 `false` 时不展示）。筛选提交时会触发 `request`，并带上 `query` 和 `currentPage: 1`。

```html
<vro-el-table :schema="schema" :columns="columns" :data="data" @request="handleRequest" />
```

> `filterProps` 现在仅保留 `schema` 的透传能力（`:filter-props="{ schema }"` 等价），同时传时以 `schema` 为准，推荐直接使用 `schema`。

### 自定义头部

```html
<vro-el-table :columns="columns" :data="data">
  <template #title>
    <h2>用户列表</h2>
  </template>

  <template #actions>
    <el-button type="primary">新增</el-button>
  </template>
</vro-el-table>
```

### useVroElTable

`useVroElTable` 会返回可直接绑定到组件的 `tableProps`，并维护筛选、分页、数据和 loading 状态。`tableProps` 里已经包含 `schema`、`columns`、`data`、`loading` 和 `pagination`，直接 `v-bind` 即可，不需要再手动拼 `filterProps`。

```html
<template>
  <vro-el-table v-bind="tableProps" @request="trigger" />
</template>

<script setup lang="ts">
  import { ElTableColumn } from 'element-plus'
  import { useVroElTable } from '@vrojs/element-plus'

  interface User {
    name: string
    amount: number
  }

  const { tableProps, trigger } = useVroElTable(
    {
      keyword: {
        label: '关键词',
        value: '',
        is: 'ElInput',
      },
    },
    async ([currentPage, pageSize], query) => {
      const res = await fetchList({ currentPage, pageSize, ...query })
      return [res.list, res.total]
    },
    {
      columns: [
        { is: ElTableColumn, label: '姓名', prop: 'name' },
        {
          is: ElTableColumn,
          label: '金额',
          prop: 'amount',
          renderContent: ({ row }) => `${row.amount} 元`,
        },
      ],
    },
  )
</script>
```

> `schema` 只在传入了筛选表单时存在，未传时为 `undefined`，此时表格不渲染筛选区；需要单独操作筛选字段时再从返回值里取 `schema`。

> **参数顺序固定为「筛选表单 → 请求函数 → 选项」，列配置放在 `options.columns`。**
>
> `request` 是 `Row` 的唯一推断来源，且排在 `options` 之前，所以 `options.columns` 里的 `row` 能直接拿到具体类型。只有两种入参形式：
>
> ```ts
> // ① 请求函数
> useVroElTable(request, options?)
>
> // ② 筛选表单 + 请求函数
> useVroElTable(rowSchema, request, options?)
> ```
>
> `options` 支持 `columns`、`query`、`initialValue`、`immediate`、`activated`、`throwError`、`onError`；若确实需要固定行类型，仍可显式指定泛型 `useVroElTable<User>(...)`。

## API

### 属性 Props

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElTableProps" :key="key">
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
      <td>自定义表格列内容，追加在 columns 渲染的列之后</td>
    </tr>
    <tr>
      <td>title</td>
      <td>自定义头部标题区域</td>
    </tr>
    <tr>
      <td>actions</td>
      <td>自定义头部操作区域，追加在刷新按钮之后</td>
    </tr>
    <tr>
      <td>content-prefix</td>
      <td>自定义表格内部前置列内容，渲染在 columns 之前</td>
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
      <td>request</td>
      <td>payload?: VroElTableRequestPayload</td>
      <td>筛选、刷新、分页变化时触发</td>
    </tr>
    <tr>
      <td>selection-change</td>
      <td>selection: any[]</td>
      <td>ElTable selection-change 事件透传</td>
    </tr>
  </tbody>
</table>

### 实例方法

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>elTable</td>
      <td>内部 ElTable 实例</td>
    </tr>
  </tbody>
</table>

### 样式变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>--vro-el-table-gap</td>
      <td>16px</td>
      <td>表格筛选区与内容区间距</td>
    </tr>
    <tr>
      <td>--vro-el-table-padding</td>
      <td>16px</td>
      <td>表格内容区内边距</td>
    </tr>
    <tr>
      <td>--vro-el-table-inner-gap</td>
      <td>var(--vro-el-table-gap)</td>
      <td>表格内容区内部间距</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTable, vroElTableProps } from '.'
  import { parseType } from '../utils'
</script>
