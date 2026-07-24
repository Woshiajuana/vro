# VroLoading

### 介绍

纯 Vue/CSS 的加载图标，不依赖第三方库。支持圆环、线圈、点状、图片加载四种形态，可配置尺寸、颜色和动画时长。

## 代码演示

### 基础用法

```html
<vro-loading />
```

### 加载类型

```html
<vro-loading type="circular" />
<vro-loading type="spinner" />
<vro-loading type="dots" />
<vro-loading type="image" :size="15" color="#999" />
```

### 自定义样式

```html
<vro-loading type="spinner" color="#409eff" :size="40" />
<vro-loading type="image" color="#909399" :size="30" duration="800ms" />
```

### 自定义图标

```html
<vro-loading>
  <template #icon>
    <span class="custom-loading-icon"></span>
  </template>
</vro-loading>
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
    <tr v-for="(item, key) in vroLoadingProps" :key="key">
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
      <td>icon</td>
      <td>自定义加载图标</td>
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
      <td>--vro-loading-size</td>
      <td>24px</td>
    </tr>
    <tr>
      <td>--vro-loading-color</td>
      <td>currentColor</td>
    </tr>
    <tr>
      <td>--vro-loading-circular-duration</td>
      <td>1.6s</td>
    </tr>
    <tr>
      <td>--vro-loading-spinner-duration</td>
      <td>1.2s</td>
    </tr>
    <tr>
      <td>--vro-loading-dots-duration</td>
      <td>1s</td>
    </tr>
    <tr>
      <td>--vro-loading-image-duration</td>
      <td>1.2s</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroLoading, vroLoadingProps } from '.'
  import { parseType } from '../utils'
</script>
