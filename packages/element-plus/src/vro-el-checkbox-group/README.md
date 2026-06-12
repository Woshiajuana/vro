# VroElCheckboxGroup

### 介绍

基于 `ElCheckboxGroup` 和 `ElCheckbox` 的选项化封装。适合通过 `options` 快速渲染一组选项，同时保留 Element Plus CheckboxGroup 的原有属性和事件。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-checkbox-group v-model="value" :options="options" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['apple'])
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange', props: { disabled: true } },
  ]
</script>
```

### 自定义字段名

```html
<vro-el-checkbox-group v-model="value" :options="options" label-key="name" value-key="id" />
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
    <tr v-for="(item, key) in vroElCheckboxGroupProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

支持默认插槽，传入后会作为 `ElCheckboxGroup` 的内容，覆盖 `options` 自动渲染的选项。

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
      <td>同 Element Plus CheckboxGroup change 事件</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElCheckboxGroup, vroElCheckboxGroupProps } from '.'
  import { parseType } from '../utils'
</script>
