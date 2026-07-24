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

### 图片预览

```html
<vro-el-image
  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  :preview-src-list="[
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  ]"
  show-progress
/>
```

### 自定义占位

```html
<vro-el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
  <template #placeholder>
    <div>加载中</div>
  </template>
</vro-el-image>
```

### 加载失败

```html
<vro-el-image src="/not-found.png" />
```

### 自定义加载失败

```html
<vro-el-image src="/not-found.png">
  <template #error>
    <div>加载失败</div>
  </template>
</vro-el-image>
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
      <td>placeholder</td>
      <td>自定义占位内容，透传给 ElImage</td>
    </tr>
    <tr>
      <td>error</td>
      <td>自定义加载失败内容，透传给 ElImage</td>
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
      <td>--vro-el-image-placeholder-background</td>
      <td>var(--el-fill-color-light)</td>
    </tr>
    <tr>
      <td>--vro-el-image-loading-color</td>
      <td>var(--el-text-color-placeholder)</td>
    </tr>
    <tr>
      <td>--vro-el-image-loading-size</td>
      <td>16px</td>
    </tr>
    <tr>
      <td>--vro-el-image-error-background</td>
      <td>var(--el-fill-color-light)</td>
    </tr>
    <tr>
      <td>--vro-el-image-error-color</td>
      <td>var(--el-text-color-placeholder)</td>
    </tr>
    <tr>
      <td>--vro-el-image-error-icon-size</td>
      <td>24px</td>
    </tr>
  </tbody>
</table>

### 实例方法

支持 `ElImage` 暴露的实例方法。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElImage, vroElImageProps } from '.'
  import { parseType } from '../utils'
</script>
