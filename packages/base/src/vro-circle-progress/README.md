# VroCircleProgress

### 介绍

基于 SVG 实现的圆形进度条，支持自定义尺寸、线宽、颜色、动画时长和动画速度曲线。

## 代码演示

### 基础用法

```html
<vro-circle-progress :model-value="60" />
```

### 自定义样式

```html
<vro-circle-progress :model-value="68" color="#1989fa" background-color="#ebedf0" />
<vro-circle-progress :model-value="68" :size="80" :stroke-width="6" color="#07c160" />
```

### 端点样式

```html
<vro-circle-progress :model-value="68" stroke-linecap="round" />
```

### 动画配置

```html
<vro-circle-progress :model-value="progress" :duration="1000" curve="linear" />
<vro-circle-progress :model-value="progress" duration="1.2s" curve="ease-in-out" />
```

### 自定义内容

```html
<vro-circle-progress :model-value="86" color="#ff976a">
  <strong>86</strong>
</vro-circle-progress>
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
    <tr v-for="(item, key) in vroCircleProgressProps" :key="key">
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
      <td>参数</td>
    </tr>
    <tr>
      <td>default</td>
      <td>自定义进度条中间内容</td>
      <td>{ value: number }</td>
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
      <td>--vro-circle-progress-size</td>
      <td>100px</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-color</td>
      <td>currentColor</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-background-color</td>
      <td>rgba(0, 0, 0, 0.08)</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-duration</td>
      <td>300ms</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-curve</td>
      <td>ease</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-content-color</td>
      <td>currentColor</td>
    </tr>
    <tr>
      <td>--vro-circle-progress-content-font-size</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroCircleProgress, vroCircleProgressProps } from '.'
  import { parseType } from '../utils'
</script>
