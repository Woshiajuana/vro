# VroLoading

### 介绍

纯 Vue/CSS 的加载图标，不依赖第三方库。支持圆环、线圈、点状三种形态，可配置尺寸和颜色。

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
```

### 自定义样式

```html
<vro-loading type="spinner" color="#409eff" :size="40" />
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

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroLoading, vroLoadingProps } from '.'
  import { parseType } from '../utils'
</script>
