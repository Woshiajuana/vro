# VroAspectRatio

### 介绍

按照指定宽高比撑开容器，常用于图片、视频、卡片封面等固定比例区域。

## 代码演示

### 基础用法

```html
<vro-aspect-ratio :ratio="16 / 9">
  <div>16:9</div>
</vro-aspect-ratio>
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
    <tr v-for="(item, key) in vroAspectRatioProps" :key="key">
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
      <td>内容</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroAspectRatio, vroAspectRatioProps } from '.'
  import { parseType } from '../utils'
</script>
