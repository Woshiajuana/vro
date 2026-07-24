# VroElFileUpload

### 介绍

基于 Element Plus Button 的轻量文件上传组件。组件只负责选择文件、展示已上传地址和删除交互，实际上传逻辑由 `upload` 回调提供。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-file-upload v-model="value" :upload="upload" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')

  const upload = async (files: File[]) => {
    return files.map((file) => URL.createObjectURL(file))
  }
</script>
```

### 多文件上传

```html
<vro-el-file-upload v-model="value" :max="3" :upload="upload" />
```

### 文件类型

```html
<vro-el-file-upload v-model="value" accept=".pdf,.doc,.docx" :upload="upload" />
```

### 自定义上传参数

```html
<vro-el-file-upload
  v-model="value"
  :params="{ domain: 'https://cdn.example.com', folder: 'docs' }"
  :upload="upload"
/>
```

### 禁用状态

```html
<vro-el-file-upload v-model="value" disabled :upload="upload" />
```

### 全局上传配置

```ts
import { setVroElFileUploadOptions } from '@vrojs/element-plus'

setVroElFileUploadOptions({
  upload: async (files, { params }) => {
    return files.map((file) => `${params.domain}/${file.name}`)
  },
})
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
    <tr v-for="(item, key) in vroElFileUploadProps" :key="key">
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
      <td>value: string | string[]</td>
      <td>上传或删除后触发</td>
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
      <td>--vro-el-file-upload-gap</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-item-font-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-item-line-height</td>
      <td>1.5</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-link-color</td>
      <td>var(--el-color-primary)</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-clear-gap</td>
      <td>10px</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-clear-color</td>
      <td>var(--el-color-danger)</td>
    </tr>
    <tr>
      <td>--vro-el-file-upload-clear-background</td>
      <td>var(--el-fill-color-light)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElFileUpload, vroElFileUploadProps } from '.'
  import { parseType } from '../utils'
</script>
