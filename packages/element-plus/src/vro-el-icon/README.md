# VroElIcon

### 介绍

对 `VroIcon` 和 Element Plus 图标组件的轻量整合。`name` 可以传入 Element Plus 图标组件、已注册组件名、字体图标类名或图片地址，适合在业务组件里统一图标写法。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-icon :name="Search" size="24" />
  <vro-el-icon :name="Edit" color="#f56c6c" />
</template>

<script setup lang="ts">
  import { Edit, Search } from '@element-plus/icons-vue'
</script>
```

### 使用已注册组件名

`name` 传入大写开头的字符串时，会按组件名交给动态组件渲染。

```html
<vro-el-icon name="Search" />
```

### 字体图标

普通字符串会透传给 `VroIcon`，作为字体图标类名使用。

```html
<vro-el-icon name="icon-search" font-family="iconfont" />
```

### 图片图标

图片地址会透传给 `VroIcon` 渲染为图片图标。

```html
<vro-el-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" :size="24" />
```

### 旋转动画

```html
<vro-el-icon :name="Loading" loading />
<vro-el-icon :name="Loading" loading="800ms" />
```

### 使用插槽

```html
<vro-el-icon>
  <search />
</vro-el-icon>
```

### 无障碍标签

未传入 `aria-label` 时图标会被辅助技术忽略；有语义的图标可以传入 `aria-label`。

```html
<vro-el-icon :name="Search" aria-label="search" />
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
    <tr v-for="(item, key) in vroElIconProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### CSS 变量

同 `VroIcon`，支持通过 `--vro-icon-duration`、`--vro-icon-size`、`--vro-icon-color` 调整默认样式。

### 实例方法

暂无。

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

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElIcon, vroElIconProps } from '.'
  import { parseType } from '../utils'
</script>
