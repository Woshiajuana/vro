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
