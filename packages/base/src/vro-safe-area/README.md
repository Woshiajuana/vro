# VroSafeArea

### 介绍

安全区适配容器，用于给内容添加设备安全区域对应方向的内边距。

## 代码演示

### 基础用法

```html
<vro-safe-area>
  内容区域
</vro-safe-area>
```

### 顶部安全区

```html
<vro-safe-area top>
  顶部安全区
</vro-safe-area>
```

### 底部安全区

```html
<vro-safe-area bottom>
  底部安全区
</vro-safe-area>
```

### 左右安全区

```html
<vro-safe-area left right>
  左右安全区
</vro-safe-area>
```

### 组合使用

```html
<vro-safe-area top bottom left right>
  四向安全区
</vro-safe-area>
```

### 自定义内边距

通过 CSS 变量设置基础内边距，开启安全区方向后会在基础内边距上叠加安全区距离。

```html
<vro-safe-area
  top
  bottom
  style="
    --vro-safe-area-padding-top: 12px;
    --vro-safe-area-padding-bottom: 12px;
    --vro-safe-area-padding-left: 16px;
    --vro-safe-area-padding-right: 16px;
  "
>
  内容区域
</vro-safe-area>
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
    <tr v-for="(item, key) in vroSafeAreaProps" :key="key">
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
      <td>默认内容</td>
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
      <td>--vro-safe-area-padding-top</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>--vro-safe-area-padding-right</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>--vro-safe-area-padding-bottom</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>--vro-safe-area-padding-left</td>
      <td>0px</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroSafeArea, vroSafeAreaProps } from '.'
  import { parseType } from '../utils'
</script>
