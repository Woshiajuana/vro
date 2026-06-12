# VroElIcon

### 介绍

基于 `ElIcon` 的图标封装。`name` 传入 Element Plus 图标组件或大写组件名时按组件渲染，传入普通字符串时按 `iconfont` 类名渲染。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-icon :name="Search" />
  <vro-el-icon name="icon-search" />
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
</script>
```

### 使用插槽

```html
<vro-el-icon>
  <search />
</vro-el-icon>
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
    <tr v-for="(item, key) in vroElIconProps" :key="key">
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
      <td>自定义图标内容</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElIcon, vroElIconProps } from '.'
  import { parseType } from '../utils'
</script>
