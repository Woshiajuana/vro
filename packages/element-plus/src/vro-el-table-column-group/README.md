# VroElTableColumnGroup

### 介绍

用于根据 `columns` 配置批量渲染表格列。默认使用 `VroElTableColumn`，也可以通过 `is` 指定组件名、组件对象，或使用 `vroElTableColumnGroupColumnManager` 注册的列模板。

## 代码演示

### 基础用法

```html
<el-table :data="tableData" border>
  <vro-el-table-column-group :columns="columns" />
</el-table>
```

```ts
const columns = [
  { type: 'index', label: '序号', width: 72 },
  { label: '姓名', prop: 'name' },
  { label: '状态', prop: 'status', map: statusMap },
  { label: '金额', prop: 'amount', unit: ' 元', align: 'right' },
]
```

### 指定列组件

```ts
const columns = [
  { is: ElTableColumn, type: 'selection', width: 48 },
  {
    is: 'VroElTableActionsColumn',
    width: 160,
    actions: [{ label: '编辑', onAction: handleEdit }],
  },
]
```

### 隐藏列

`hidden` 支持布尔值或函数，函数返回 `true` 时隐藏当前列。

```ts
const columns = [
  { label: '姓名', prop: 'name' },
  {
    label: '金额',
    prop: 'amount',
    hidden: () => !showAmount.value,
  },
]
```

### 函数式列配置

```ts
const columns = () => [
  { label: '姓名', prop: 'name' },
  {
    is: 'VroElTableActionsColumn',
    actions: (row) => [
      {
        label: row.status === 'enabled' ? '停用' : '启用',
        onAction: handleToggle,
      },
    ],
  },
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

const columns = [{ is: 'selection' }, { label: '姓名', prop: 'name' }]
```

### useVroElTableColumnGroup

`useVroElTableColumnGroup` 会将静态数组或函数返回值转为响应式列配置，适合需要动态修改列属性、排序或显隐的场景。

```ts
import { useVroElTableColumnGroup } from '@vrojs/element-plus'

const columns = useVroElTableColumnGroup([
  { label: '姓名', prop: 'name' },
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

### Column

`Column` 支持 `VroElTableColumn` 和 `VroElTableActionsColumn` 的属性，并额外支持以下属性。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>is</td>
      <td>string | Component</td>
      <td>列组件，不传时默认使用 VroElTableColumn</td>
    </tr>
    <tr>
      <td>props</td>
      <td>Record&lt;string, any&gt;</td>
      <td>额外列属性，会与当前配置合并后透传给列组件</td>
    </tr>
    <tr>
      <td>hidden</td>
      <td>boolean | (column, index) => boolean</td>
      <td>是否隐藏当前列</td>
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
