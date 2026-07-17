# VroElTableColumnGroup

### 介绍

用于根据 `columns` 配置批量渲染表格列。适合和 `ElTable` 或 `VroElTable` 配合使用，也可以通过 `vroElTableColumnGroupColumnManager` 注册常用列模板。

## 代码演示

### 基础用法

```html
<template>
  <el-table :data="tableData">
    <vro-el-table-column-group :columns="columns" />
  </el-table>
</template>

<script setup lang="ts">
  import { ElTableColumn } from 'element-plus'
  import type { VroElTableColumnGroupColumn } from '@vrojs/element-plus'

  const tableData = [{ name: '张三', amount: 12800 }]

  const columns: VroElTableColumnGroupColumn[] = [
    { is: ElTableColumn, label: '姓名', prop: 'name' },
    {
      is: ElTableColumn,
      label: '金额',
      prop: 'amount',
      align: 'right',
      formatter: (row) => `¥${row.amount.toLocaleString()}`,
    },
  ]
</script>
```

### 隐藏列

`hidden` 支持布尔值或函数。

```ts
const columns = [
  { is: ElTableColumn, label: '姓名', prop: 'name' },
  { is: ElTableColumn, label: '金额', prop: 'amount', hidden: () => !showAmount.value },
]
```

### 注册列模板

通过 `vroElTableColumnGroupColumnManager` 可以注册常用列，`columns` 中传入注册 key 即可复用。

```ts
import { ElTableColumn } from 'element-plus'
import { vroElTableColumnGroupColumnManager } from '@vrojs/element-plus'

vroElTableColumnGroupColumnManager.add('selection', ElTableColumn, {
  type: 'selection',
  width: 48,
})

const columns = [{ is: 'selection' }, { is: ElTableColumn, label: '姓名', prop: 'name' }]
```

### useVroElTableColumnGroup

`useVroElTableColumnGroup` 会将静态数组或函数返回值转为响应式列配置。

```ts
import { useVroElTableColumnGroup } from '@vrojs/element-plus'

const columns = useVroElTableColumnGroup(() => [
  { is: ElTableColumn, label: '姓名', prop: 'name' },
])
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
    <tr v-for="(item, key) in vroElTableColumnGroupProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

暂无。

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTableColumnGroup, vroElTableColumnGroupProps } from '.'
  import { parseType } from '../utils'
</script>
