# VroElTableActionsColumn

### 介绍

基于 Element Plus `ElTableColumn` 封装的表格操作列组件。支持原生列属性透传，并提供常用操作按钮、更多操作、禁用、隐藏和插槽自定义能力。

## 代码演示

### 基础用法

```html
<el-table :data="tableData" border>
  <el-table-column label="姓名" prop="name" />
  <vro-el-table-actions-column :actions="actions" width="160" />
</el-table>
```

```ts
const actions = [
  {
    label: '编辑',
    onAction: (row) => {
      console.log(row)
    },
  },
]
```

### 更多操作

```html
<vro-el-table-actions-column
  :actions="actions"
  :more-actions="moreActions"
  more-trigger="click"
  width="220"
/>
```

### 按行动态操作

```ts
const actions = (row) => [
  {
    label: '编辑',
    disabled: row.status === 'disabled',
  },
  {
    label: row.status === 'enabled' ? '停用' : '启用',
    type: row.status === 'enabled' ? 'warning' : 'success',
    onAction: handleToggle,
  },
]
```

### 禁用与隐藏

```ts
const actions = [
  {
    label: '编辑',
    disabled: true,
  },
  {
    label: '启用',
    hidden: (row) => row.status === 'enabled',
  },
]
```

### 自定义操作内容

```html
<vro-el-table-actions-column :actions="actions" :more-actions="moreActions">
  <template #action="{ action }">
    {{ action.label }}
  </template>

  <template #more-action="{ action }">
    {{ action.label }}
  </template>
</vro-el-table-actions-column>
```

## API

### 属性 Props

支持 Element Plus `ElTableColumn` 的全部属性，并额外支持以下属性。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElTableActionsColumnProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### Action

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>label</td>
      <td>string</td>
      <td>操作文本</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>string</td>
      <td>操作图标</td>
    </tr>
    <tr>
      <td>type</td>
      <td>primary | success | warning | danger | info</td>
      <td>按钮类型</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>boolean</td>
      <td>是否禁用</td>
    </tr>
    <tr>
      <td>hidden</td>
      <td>(row, index) => boolean</td>
      <td>是否隐藏，返回 true 时隐藏当前操作</td>
    </tr>
    <tr>
      <td>onAction</td>
      <td>(row, index) => any</td>
      <td>点击操作时触发</td>
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
      <td>自定义整列内容，参数为 { row, column, $index }</td>
    </tr>
    <tr>
      <td>action</td>
      <td>自定义直接展示的操作项内容，参数为 { row, column, $index, action }</td>
    </tr>
    <tr>
      <td>more-action</td>
      <td>自定义更多操作项内容，参数为 { row, column, $index, action }</td>
    </tr>
  </tbody>
</table>

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-el-table-actions-column-row-gap</td>
      <td>4px</td>
    </tr>
    <tr>
      <td>--vro-el-table-actions-column-column-gap</td>
      <td>12px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTableActionsColumn, vroElTableActionsColumnProps } from '.'
  import { parseType } from '../utils'
</script>
