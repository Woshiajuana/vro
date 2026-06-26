# VroElImageUpload

### 介绍

基于 Element Plus Image 的图片上传组件。组件负责图片选择、预览、删除和拖拽排序。默认不立即上传，`modelValue` 返回本地 `File[]`，业务可以在提交表单时自行处理文件；也可以通过 `upload` 回调返回图片访问地址。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-image-upload v-model="value" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref<File[]>([])
</script>
```

### 多图上传

```vue
<template>
  <vro-el-image-upload v-model="value" :max="3" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref<File[]>([])
</script>
```

### 自定义上传

```html
<vro-el-image-upload v-model="value" :upload="upload" />
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
      <td>value: string | Array&lt;string | File&gt;</td>
      <td>选择、上传、删除或排序后触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElImageUpload, vroElImageUploadProps } from '.'
  import { parseType } from '../utils'
</script>
