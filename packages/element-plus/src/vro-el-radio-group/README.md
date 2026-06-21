# VroElRadioGroup

### 介绍

基于 `ElRadioGroup` 和 `ElRadio` 的选项化封装。适合通过 `options` 快速渲染单选项，同时保留 Element Plus RadioGroup 的原有属性和事件。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-radio-group v-model="value" :options="options" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('daily')
  const options = [
    { label: '每天', value: 'daily' },
    { label: '每周', value: 'weekly' },
    { label: '每月', value: 'monthly', props: { disabled: true } },
  ]
</script>
```

### 自定义字段名

```html
<vro-el-radio-group v-model="value" :options="options" label-key="name" value-key="id" />
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
    <tr v-for="(item, key) in vroElRadioGroupProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

暂无。

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
      <td>同 Element Plus RadioGroup change 事件</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElRadioGroup, vroElRadioGroupProps } from '.'
  import { parseType } from '../utils'
</script>
