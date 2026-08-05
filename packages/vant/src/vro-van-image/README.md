# VroVanImage

### 介绍

基于原生 `img` 标签封装的图片组件，支持加载失败占位、图片地址转换和图片预览。

## 代码演示

### 基础用法

```html
<vro-van-image class="demo-image" :src="imageUrl" alt="图片" />
```

### 加载失败占位

```html
<vro-van-image class="demo-image" src="/not-found.png" :placeholder="placeholderUrl" />
```

### 图片预览

```html
<vro-van-image class="demo-image" :preview="[imageUrl, previewUrl]" :src="imageUrl" />
<vro-van-image
  class="demo-image"
  :preview="[imageUrl, previewUrl]"
  preview-index="1"
  :src="previewUrl"
/>
```

### 图片地址转换

```html
<vro-van-image
  src="/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  base-url="https://fuss10.elemecdn.com"
  class="demo-image"
  ratio="300x300"
  preview-ratio="origin"
  :normalize-src="normalizeSrc"
/>
```

### 自定义加载样式

```html
<vro-van-image
  class="demo-image"
  :src="imageUrl"
  style="--vro-van-image-loading-size: min(18px, 16%)"
/>
```

### 全局配置

```ts
import { setVroVanImageOptions } from '@vrojs/vant'

setVroVanImageOptions({
  baseUrl: 'https://fuss10.elemecdn.com',
  loadingSrc: '/loading.gif',
  placeholder: '/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  preview: true,
  ratio: '300x300',
  previewRatio: 'origin',
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
    <tr v-for="(item, key) in vroVanImageProps" :key="key">
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
      <td>load</td>
      <td>event: Event</td>
      <td>图片加载完成时触发</td>
    </tr>
    <tr>
      <td>error</td>
      <td>event: Event</td>
      <td>图片加载失败时触发</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

暂无。

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-van-image-loading-background</td>
      <td>#f2f2f2</td>
    </tr>
    <tr>
      <td>--vro-van-image-loading-image</td>
      <td>url('../img-loading.gif')</td>
    </tr>
    <tr>
      <td>--vro-van-image-loading-size</td>
      <td>min(10px, 10%)</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanImage, vroVanImageProps } from '.'
  import { parseType } from '../utils'
</script>
