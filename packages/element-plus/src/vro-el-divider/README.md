# VroElDivider

### 介绍

基于 Element Plus `ElDivider` 封装的分割线组件。支持通过 `content` 直接设置分割内容，也支持默认插槽自定义内容，同时保留 `ElDivider` 的全部属性。

## 代码演示

### 基础用法

```html
<vro-el-divider />
```

### 内容

通过 `content` 设置分割线文本，内容为空时不渲染文本容器，与无内容的分割线表现一致。

```html
<vro-el-divider content="分割线内容" />
```

### 内容位置

`contentPosition` 控制内容在分割线上的位置。

```html
<vro-el-divider content="左侧内容" content-position="left" />
<vro-el-divider content="居中内容" content-position="center" />
<vro-el-divider content="右侧内容" content-position="right" />
```

### 虚线

`borderStyle` 透传给 `ElDivider`，支持 `solid`、`dashed`、`dotted` 等。

```html
<vro-el-divider content="虚线" border-style="dashed" />
```

### 垂直分割线

`direction` 为 `vertical` 时用于行内内容分隔，建议放在 `display: flex`、`align-items: center` 的容器中。

```html
<div class="demo-divider-vertical">
  <span>文案一</span>
  <vro-el-divider direction="vertical" />
  <span>文案二</span>
</div>
```

```css
.demo-divider-vertical {
  display: flex;
  align-items: center;
}
```

### 自定义内容

默认插槽优先级高于 `content`，可传入更复杂的结构。

```html
<vro-el-divider>
  <span style="color: var(--el-color-primary)">默认插槽内容</span>
</vro-el-divider>
```

## API

### 属性 Props

支持 Element Plus `ElDivider` 的全部属性，并额外支持以下属性。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElDividerProps" :key="key">
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
      <td>自定义分割线内容，优先级高于 content</td>
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
      <td>--vro-el-divider-content-color</td>
      <td>var(--el-text-color-regular)</td>
    </tr>
    <tr>
      <td>--vro-el-divider-content-font-size</td>
      <td>var(--el-font-size-base)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElDivider, vroElDividerProps } from '.'
  import { parseType } from '../utils'
</script>
