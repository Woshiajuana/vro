# VroElTableColumn

### 介绍

基于 Element Plus `ElTableColumn` 封装的表格列组件。支持原生列属性透传，并额外提供空值占位、枚举映射、单位、前后缀图标和默认内容渲染能力。

## 代码演示

### 基础用法

```html
<el-table :data="tableData" border>
  <vro-el-table-column label="姓名" prop="name" />
  <vro-el-table-column label="状态" prop="status" :map="statusMap" />
  <vro-el-table-column label="金额" prop="amount" unit=" 元" align="right" />
</el-table>
```

### 空值与图标

```html
<el-table :data="tableData" border>
  <vro-el-table-column
    label="备注"
    prop="remark"
    placeholder="暂无备注"
    :line-clamp="2"
    :prefix-icon="{ name: Document }"
  />
  <vro-el-table-column label="评分" prop="score" :suffix-icon="{ name: Star, color: '#e6a23c' }" />
</el-table>
```

### 自定义内容

```html
<vro-el-table-column label="姓名" prop="name">
  <template #default="{ row }">
    <el-tag>{{ row.name }}</el-tag>
  </template>
</vro-el-table-column>
```

### 自定义渲染

`render` 用于自定义整格内容，适合无法使用插槽的配置化场景（如 `VroElTableColumnGroup`、`useVroElTable`）；`renderContent` 只替换中间主体，前后缀图标仍然生效。

```html
<vro-el-table-column label="状态" prop="status" :render="renderStatus" />
```

```ts
const renderStatus = ({ row, value }) => {
  return h(ElTag, { type: row.status === 'enabled' ? 'success' : 'info' }, () => value)
}
```

### 动态映射

`map` 支持传入函数按行生成字典。

```html
<vro-el-table-column label="状态" prop="status" :map="getStatusMap" />
```

```ts
const getStatusMap = (row) => {
  return row.type === 'vip' ? vipStatusMap : statusMap
}
```

## API

### 属性 Props

支持 Element Plus `ElTableColumn` 的全部属性，并额外支持以下属性。

> `formatter` 由组件内部接管，不再透传给 `el-table-column`，返回值为字符串或数字时才会拼接 `unit`。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElTableColumnProps" :key="key">
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
      <td>自定义单元格内容，参数为 { row, column, $index }</td>
    </tr>
    <tr>
      <td>header</td>
      <td>自定义表头内容，参数为 { column, $index }</td>
    </tr>
    <tr>
      <td>expand</td>
      <td>自定义展开图标，参数为 { expanded, expandable }</td>
    </tr>
    <tr>
      <td>filter-icon</td>
      <td>自定义筛选图标，参数为 { filterOpened }</td>
    </tr>
    <tr>
      <td>prefix</td>
      <td>自定义默认内容前缀，参数为 { row, column, $index }</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>自定义默认内容后缀，参数为 { row, column, $index }</td>
    </tr>
  </tbody>
</table>

> 除 `default`、`prefix`、`suffix` 外，其余插槽都会原样透传给 `el-table-column`，因此 Element Plus 新增的插槽无需组件额外适配。

### 注意事项

- `type` 为 `expand` 时，`default` 插槽表示展开内容，会原样转发；`selection`、`index` 列默认不渲染 `default`，除非显式传入 `default` 插槽或 `render`。
- `placeholder`、`lineClamp`、`prefixIcon`、`suffixIcon` 只在默认渲染链路生效；使用 `render` 时组件不做任何包裹。
- `lineClamp` 与 `showOverflowTooltip` 都会截断内容，多行省略与 tooltip 单行测量互斥，请二选一使用。
- 空值判定：`null`、`undefined`、`''`、`[]` 视为空，`0`、`false` 不视为空。
- 多级表头（嵌套列）请使用 `VroElTableColumnGroup`，不要在 `VroElTableColumn` 内直接嵌套列组件。

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-el-table-column-gap</td>
      <td>4px</td>
    </tr>
    <tr>
      <td>--vro-el-table-column-icon-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-el-table-column-line-clamp</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTableColumn, vroElTableColumnProps } from '.'
  import { parseType } from '../utils'
</script>
