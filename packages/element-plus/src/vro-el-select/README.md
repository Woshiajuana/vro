# VroElSelect

### 介绍

基于 `ElSelect` 和 `ElOption` 的选项化封装。适合通过 `options` 快速渲染下拉选项，同时保留 Element Plus Select 的原有属性和事件。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-select v-model="value" :options="options" placeholder="请选择" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange', props: { disabled: true } },
  ]
</script>
```

### 自定义字段名

```html
<vro-el-select v-model="value" :options="options" label-key="name" value-key="id" />
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
    <tr v-for="(item, key) in vroElSelectProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

支持默认插槽，传入后会作为 `ElSelect` 的内容，覆盖 `options` 自动渲染的选项。

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>参数</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>update:modelValue</td>
      <td>value</td>
      <td>选中值变化时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value</td>
      <td>同 Element Plus Select change 事件</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSelect, vroElSelectProps } from '.'
  import { parseType } from '../utils'
</script>
