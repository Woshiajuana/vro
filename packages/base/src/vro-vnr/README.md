# VroVnr

### 介绍

用于渲染由 `h`、`render` 函数或其他逻辑生成的 VNode 数组。

## 代码演示

### 基础用法

```html
<template>
  <vro-vnr :nodes="nodes" />
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const nodes = [h('span', '文本'), h('button', { type: 'button' }, '按钮')]
</script>
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
    <tr v-for="(item, key) in vroVnrProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVnr, vroVnrProps } from '.'
  import { parseType } from '../utils'
</script>
