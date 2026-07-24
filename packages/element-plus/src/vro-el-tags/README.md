# VroElTags

### 介绍

基于 `ElTag`、`ElInput` 和 `ElButton` 的标签编辑组件。支持通过 `v-model` 新增、删除标签，也可以设置为只读禁用状态。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-tags v-model="value" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['Vue', 'Element Plus'])
</script>
```

### 禁用状态

```html
<vro-el-tags v-model="value" disabled />
```

### 数量限制

```html
<vro-el-tags v-model="value" :max="3" />
```

### 属性配置

```html
<vro-el-tags
  v-model="value"
  :tag-props="{ type: 'success', effect: 'plain' }"
  :input-props="{ size: 'small', maxlength: 12 }"
  :button-props="{ size: 'small', type: 'success' }"
/>
```

### 自定义内容

```html
<vro-el-tags v-model="value">
  <template #tag="{ item, index }"> {{ index + 1 }}. {{ item }} </template>
  <template #add>新增技能</template>
</vro-el-tags>
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
    <tr v-for="(item, key) in vroElTagsProps" :key="key">
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
      <td>tag</td>
      <td>自定义标签内容，参数为 { item, index }</td>
    </tr>
    <tr>
      <td>add</td>
      <td>自定义新增按钮内容</td>
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
      <td>value</td>
      <td>标签列表变化时触发</td>
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
      <td>--vro-el-tags-gap</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-el-tags-input-width</td>
      <td>120px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTags, vroElTagsProps } from '.'
  import { parseType } from '../utils'
</script>
