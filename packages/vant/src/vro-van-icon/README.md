# VroVanIcon

### 介绍

对 `VroIcon` 和 Vant 图标字体的轻量整合。`name` 以 `van-icon-` 开头时会自动使用 Vant 图标字体，也支持普通字体图标、图片图标和自定义 SVG。

## 代码演示

### 基础用法

```html
<vro-van-icon name="van-icon-chat-o" />
<vro-van-icon name="van-icon-like-o" color="#ee0a24" :size="24" />
```

### 字体图标

非 `van-icon-` 开头的普通字符串会透传给 `VroIcon`，作为字体图标类名使用。

```html
<vro-van-icon name="icon-search" font-family="iconfont" />
```

### 图片图标

图片地址会透传给 `VroIcon` 渲染为图片图标。

```html
<vro-van-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" :size="24" />
```

### 旋转动画

```html
<vro-van-icon name="van-icon-replay" loading />
<vro-van-icon name="van-icon-replay" loading="800ms" />
```

### 使用插槽

```html
<vro-van-icon :size="24" color="#1989fa">
  <svg viewBox="0 0 1024 1024">
    <path d="..." />
  </svg>
</vro-van-icon>
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
    <tr v-for="(item, key) in vroVanIconProps" :key="key">
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

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanIcon, vroVanIconProps } from '.'
  import { parseType } from '../utils'
</script>
