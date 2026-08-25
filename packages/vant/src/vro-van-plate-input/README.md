# VroVanPlateInput

### 介绍

车牌号输入组件，内置车牌前缀选择器和自定义键盘，支持清空、禁用、只读、最大长度和弹层配置。

## 代码演示

### 基础用法

```html
<vro-van-plate-input v-model="value" label="车牌号" />
```

### 可清空

```html
<vro-van-plate-input v-model="value" label="车牌号" clearable />
```

### 限制长度

```html
<vro-van-plate-input v-model="value" label="新能源车牌" :maxlength="8" />
```

### 自定义占位

```html
<vro-van-plate-input
  v-model="value"
  label="车牌号"
  placeholder="请输入后续号码"
/>
```

### 自定义弹层

```html
<vro-van-plate-input
  v-model="value"
  label="车牌号"
  :plate-picker-props="{ title: '选择地区', extraKeys: ['未上牌'] }"
  :keyboard-props="{ title: '输入号码', disabledKeys: ['I', 'O'] }"
/>
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
    <tr v-for="(item, key) in vroVanPlateInputProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>参数</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>update:modelValue</td>
      <td>value: string</td>
      <td>车牌号变化时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value: string</td>
      <td>车牌号变化时触发</td>
    </tr>
    <tr>
      <td>click-prefix</td>
      <td>event: MouseEvent</td>
      <td>点击车牌前缀时触发</td>
    </tr>
    <tr>
      <td>clear</td>
      <td>-</td>
      <td>点击清除按钮时触发</td>
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
      <td>--vro-van-plate-input-gap</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-prefix-height</td>
      <td>28px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-prefix-padding</td>
      <td>0 8px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-prefix-radius</td>
      <td>4px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-prefix-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-prefix-background</td>
      <td>var(--van-background)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-input-clear-size</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanPlateInput, vroVanPlateInputProps } from '.'
  import { parseType } from '../utils'
</script>
