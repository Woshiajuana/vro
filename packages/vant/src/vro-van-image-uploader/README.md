# VroVanImageUploader

### 介绍

图片上传展示组件，支持预设图片位、已有图片展示、文件选择入口和图片预览属性透传。

## 代码演示

### 基础用法

```html
<vro-van-image-uploader v-model="basicValue" />
```

### 已有图片

```html
<vro-van-image-uploader :model-value="imageUrl" :image-props="{ preview: true }" />
```

### 多图展示

```html
<vro-van-image-uploader v-model="images" :image-props="{ preview: images }" :max="4" />
```

### 预设图片位

```html
<vro-van-image-uploader :model-value="images.slice(0, 1)" :preset="preset" />
```

### 文件类型和多选

```html
<vro-van-image-uploader v-model="fileTypeValue" accept="image/png,image/jpeg" multiple :max="3" />
```

### 禁用状态

```html
<vro-van-image-uploader disabled :model-value="imageUrl" />
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
    <tr v-for="(item, key) in vroVanImageUploaderProps" :key="key">
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
      <td>说明</td>
      <td>参数</td>
    </tr>
    <tr>
      <td>update:modelValue</td>
      <td>绑定值变化时触发</td>
      <td>value: VroVanImageUploaderModelValue</td>
    </tr>
    <tr>
      <td>change</td>
      <td>图片列表变化时触发</td>
      <td>value: VroVanImageUploaderModelValue</td>
    </tr>
    <tr>
      <td>delete</td>
      <td>删除图片时触发</td>
      <td>item: VroVanImageUploaderItem, index: number</td>
    </tr>
    <tr>
      <td>error</td>
      <td>选择或上传失败时触发</td>
      <td>error: unknown</td>
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
      <td>--vro-van-image-uploader-gap</td>
      <td>10px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-item-width</td>
      <td>80px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-item-gap</td>
      <td>6px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-box-size</td>
      <td>80px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-box-background</td>
      <td>var(--van-gray-1)</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-box-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-required-color</td>
      <td>var(--van-danger-color)</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-plus-size</td>
      <td>18px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-delete-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-delete-font-size</td>
      <td>10px</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-delete-color</td>
      <td>#fff</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-delete-background</td>
      <td>rgba(0, 0, 0, 0.8)</td>
    </tr>
    <tr>
      <td>--vro-van-image-uploader-label-font-size</td>
      <td>12px</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanImageUploader, vroVanImageUploaderProps } from '.'
  import { parseType } from '../utils'
</script>
