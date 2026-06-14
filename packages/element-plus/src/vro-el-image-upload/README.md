# VroElImageUpload

### 介绍

基于 Element Plus Image 的图片上传组件。组件负责图片选择、预览、删除和拖拽排序，实际上传逻辑由 `upload` 回调提供。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-image-upload v-model="value" :upload="upload" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')

  const upload = async (files: File[]) => {
    return files.map((file) => URL.createObjectURL(file))
  }
</script>
```

### 多图上传

```html
<vro-el-image-upload v-model="value" :max="3" :upload="upload" />
```

### 图片压缩

```html
<vro-el-image-upload v-model="value" compressible :upload="upload" />
```

### 全局上传配置

```ts
import { setVroElImageUploadOptions } from '@vrojs/element-plus'

setVroElImageUploadOptions({
  compressible: false,
  imageProps: {
    fit: 'cover',
  },
  upload: async (files, { compress, params }) => {
    return files.map((file) => `${params.domain}/${compress ? 'compressed' : 'raw'}/${file.name}`)
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
    <tr v-for="(item, key) in vroElImageUploadProps" :key="key">
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
      <td>上传、删除或排序后触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElImageUpload, vroElImageUploadProps } from '.'
  import { parseType } from '../utils'
</script>
