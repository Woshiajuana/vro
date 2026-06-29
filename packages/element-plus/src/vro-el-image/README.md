# VroElImage

### 介绍

基于 Element Plus Image 的图片组件。组件透传 `ElImage` 的能力，并额外支持通过 `baseUrl`、`ratio`、`previewRatio` 和 `normalizeSrc` 统一处理图片地址与预览地址，适合接入图片裁剪、缩略图、CDN 参数等业务规则。

## 代码演示

### 基础用法

```html
<vro-el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
```

### 图片地址转换

```vue
<template>
  <vro-el-image
    src="/goods/cover.jpg"
    base-url="https://cdn.example.com"
    ratio="300x300"
    preview-ratio="origin"
    :preview-src-list="['/goods/cover.jpg']"
    :normalize-src="normalizeSrc"
  />
</template>

<script setup lang="ts">
  import type { VroElImageNormalizeSrc } from '@vrojs/element-plus'

  const normalizeSrc: VroElImageNormalizeSrc = ({ src, ratio, baseUrl }) => {
    const url = src.startsWith('http') ? src : `${baseUrl}${src}`
    return ratio ? `${url}?x-image-process=image/resize,${ratio}` : url
  }
</script>
```

### 全局配置

```ts
import { setVroElImageOptions } from '@vrojs/element-plus'

setVroElImageOptions({
  baseUrl: 'https://cdn.example.com',
  normalizeSrc: ({ src, ratio, baseUrl }) => {
    const url = src.startsWith('http') ? src : `${baseUrl}${src}`
    return ratio ? `${url}?ratio=${ratio}` : url
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
    <tr v-for="(item, key) in vroElImageProps" :key="key">
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
      <td>自定义图片未加载时的占位内容，透传给 ElImage</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>自定义占位内容，透传给 ElImage</td>
    </tr>
    <tr>
      <td>error</td>
      <td>自定义加载失败内容，透传给 ElImage</td>
    </tr>
    <tr>
      <td>viewer</td>
      <td>自定义图片预览内容，透传给 ElImage</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElImage, vroElImageProps } from '.'
  import { parseType } from '../utils'
</script>
