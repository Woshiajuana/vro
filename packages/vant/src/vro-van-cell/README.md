# VroVanCell

### 介绍

用于展示一行信息的单元格组件。支持标题、内容、图标、箭头、必填标识、点击态、单行/多行省略、垂直排列和自定义插槽。

## 代码演示

### 基础用法

```html
<vro-van-cell label="单元格" value="内容" />
<vro-van-cell label="带箭头" value="内容" arrow />
```

### 图标和必填

```html
<vro-van-cell label="图标" value="内容" :icon-props="{ name: 'van-icon-setting-o' }" />
<vro-van-cell required label="必填项" value="内容" />
<vro-van-cell required no-asterisk label="隐藏星号" value="内容" />
```

### 内容省略

```html
<vro-van-cell label="单行省略" value="较长的内容" ellipsis />
<vro-van-cell label="多行省略" value="较长的内容" line-clamp="2" />
```

### 垂直排列

```html
<vro-van-cell direction="column" label="单元格" value="内容" />
```

### 格式化内容

```html
<template>
  <vro-van-cell label="金额" :value="price" :formatter="formatPrice" />
</template>

<script setup lang="ts">
  const price = '12800'
  const formatPrice = (value: string) => `¥${Number(value).toLocaleString()}`
</script>
```

### 使用插槽

```html
<vro-van-cell label="自定义内容">
  <strong>插槽内容</strong>
</vro-van-cell>

<vro-van-cell value="自定义标题">
  <template #prefix>
    <vro-van-icon name="van-icon-smile-o" />
  </template>
  <template #label>
    <strong>标题插槽</strong>
  </template>
</vro-van-cell>

<vro-van-cell label="自定义区域" arrow>
  <input type="text" placeholder="请输入内容" />
  <template #suffix>
    <vro-van-icon name="van-icon-plus" />
  </template>
  <template #after>
    <div>附加内容</div>
  </template>
</vro-van-cell>
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
    <tr v-for="(item, key) in vroVanCellProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 事件 Events

暂无。

### 插槽 Slots

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>default</td>
      <td>自定义右侧内容</td>
    </tr>
    <tr>
      <td>before</td>
      <td>自定义最前置内容</td>
    </tr>
    <tr>
      <td>prefix</td>
      <td>自定义标题前置内容，会覆盖 iconProps 渲染的图标</td>
    </tr>
    <tr>
      <td>icon-default</td>
      <td>自定义 iconProps 图标的默认插槽内容</td>
    </tr>
    <tr>
      <td>label</td>
      <td>自定义标题内容</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>自定义右侧后置内容，会覆盖 arrow 渲染的箭头</td>
    </tr>
    <tr>
      <td>after</td>
      <td>自定义最后置内容</td>
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
      <td>--vro-van-cell-font-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-icon-size</td>
      <td>18px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-background</td>
      <td>var(--van-background-2)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-label-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-value-color</td>
      <td>var(--van-text-color-2)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-asterisk-color</td>
      <td>var(--van-danger-color)</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanCell, vroVanCellProps } from '.'
  import { parseType } from '../utils'
</script>
