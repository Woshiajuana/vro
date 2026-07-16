# VroIcon

### 介绍

用于展示字体图标、图片图标或自定义 SVG 图标。支持尺寸、颜色、旋转动画和无障碍标签。

## 代码演示

### 基础用法

```html
<vro-icon name="icon-search" />
```

### 图标颜色和尺寸

```html
<vro-icon name="icon-search" color="#1989fa" :size="24" />
```

### 字体图标族

`font-family` 会作为字体图标的基础类名，与 `name` 一起挂载到组件根节点。

```html
<vro-icon name="icon-search" font-family="iconfont" />
```

### 使用图片

当 `name` 为图片地址时，组件会自动渲染为图片图标。

```html
<vro-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" :size="24" />
```

### 旋转动画

`loading` 为 `true` 时使用默认动画时长，传入字符串时会作为动画时长。

```html
<vro-icon name="icon-loading" loading />
<vro-icon name="icon-loading" loading="800ms" />
```

### 自定义图标

```html
<vro-icon :size="24" color="#1989fa">
  <svg viewBox="0 0 1024 1024">
    <path d="..." />
  </svg>
</vro-icon>
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
    <tr v-for="(item, key) in vroIconProps" :key="key">
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
      <td>自定义图标内容</td>
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
      <td>--vro-icon-duration</td>
      <td>2s</td>
    </tr>
    <tr>
      <td>--vro-icon-size</td>
      <td>inherit</td>
    </tr>
    <tr>
      <td>--vro-icon-color</td>
      <td>inherit</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroIcon, vroIconProps } from '.'
  import { parseType } from '../utils'
</script>
