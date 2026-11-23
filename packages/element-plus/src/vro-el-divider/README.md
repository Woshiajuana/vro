# VroElDivider

### 介绍

分割线组件。线条由弹性容器与前后伪元素绘制，内容只占自身空间、不再用背景色遮挡线条，因此可以安全用于渐变、图片、深色等任意背景。`direction`、`contentPosition`、`borderStyle` 与 `ElDivider` 保持一致的命名。

## 代码演示

### 基础用法

```html
<vro-el-divider />
```

### 内容

通过 `content` 设置分割线文本。

```html
<vro-el-divider content="分割线内容" />
```

### 内容位置

`contentPosition` 控制内容在分割线上的位置，左侧、右侧时另一侧线条自动占满剩余空间。

```html
<vro-el-divider content="左侧内容" content-position="left" />
<vro-el-divider content="居中内容" content-position="center" />
<vro-el-divider content="右侧内容" content-position="right" />
```

### 虚线

`borderStyle` 控制线条样式，支持 `solid`、`dashed`、`dotted` 等。

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

### 特殊背景

内容不依赖背景色遮挡线条，渐变、图片等背景上也能正常展示。

```html
<div class="demo-divider-background">
  <vro-el-divider content="渐变背景下的分割线" />
  <vro-el-divider content="左侧内容" content-position="left" />
</div>
```

```css
.demo-divider-background {
  padding: 0 16px;
  background: linear-gradient(135deg, #ecf5ff, #d9ecff);
}
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
      <td>--vro-el-divider-gap</td>
      <td>12px</td>
    </tr>
    <tr>
      <td>--vro-el-divider-margin</td>
      <td>24px 0</td>
    </tr>
    <tr>
      <td>--vro-el-divider-vertical-margin</td>
      <td>0 8px</td>
    </tr>
    <tr>
      <td>--vro-el-divider-border-color</td>
      <td>var(--el-border-color)</td>
    </tr>
    <tr>
      <td>--vro-el-divider-border-width</td>
      <td>1px</td>
    </tr>
    <tr>
      <td>--vro-el-divider-border-style</td>
      <td>solid</td>
    </tr>
    <tr>
      <td>--vro-el-divider-text-offset</td>
      <td>5%</td>
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
