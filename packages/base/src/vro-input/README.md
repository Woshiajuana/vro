# VroInput

### 介绍

对原生 input 的轻量封装，只处理输入值的格式限制，不包含任何样式。ref、原生事件监听和其他原生属性由使用方按普通 input 方式处理。

## 代码演示

### 基础用法

```html
<vro-input v-model="value" placeholder="请输入内容" />
```

### 数字输入

```html
<vro-input v-model="value" type="number" />
```

### 小数输入

`type="decimal"` 会将输入限制为小数，并根据 `precision`、`min`、`max`、`auto-fix` 处理边界。

```html
<vro-input v-model="value" type="decimal" :precision="2" :min="0" :max="9999" auto-fix />
```

### 自定义格式化

```html
<vro-input v-model="value" :formatter="formatter" />
```

### 获取 input 元素

```vue
<template>
  <vro-input ref="inputRef" v-model="value" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { VroInputInstance } from '@vrojs/base'

  const value = ref('')
  const inputRef = ref<VroInputInstance>()

  inputRef.value?.input?.focus()
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
    <tr v-for="(item, key) in vroInputProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

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
      <td>value: string</td>
      <td>输入值处理后触发</td>
    </tr>
    <tr>
      <td>blur</td>
      <td>event: FocusEvent</td>
      <td>失去焦点时触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroInput, vroInputProps } from '.'
  import { parseType } from '../utils'
</script>
