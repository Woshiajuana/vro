# VroVanDatetimeRangeSelectPicker

### 介绍

基于 VroVanCell 和 VroVanDatetimePicker 封装的日期时间范围选择触发组件。适合在移动端表单中选择开始时间和结束时间，并在确认后自动回写和展示范围值。

## 代码演示

### 基础用法

```html
<vro-van-datetime-range-select-picker v-model="datetimeRange" clearable label="日期时间" />
```

### 日期格式

```html
<vro-van-datetime-range-select-picker
  v-model="dateRange"
  format="yyyy-MM-dd"
  label="日期范围"
  start-placeholder="开始日期"
  end-placeholder="结束日期"
/>
```

### 可选范围

```html
<vro-van-datetime-range-select-picker
  v-model="limitedRange"
  format="yyyy-MM-dd hh:mm"
  label="可选范围"
  :max="maxDate"
  :min="minDate"
/>
```

### 垂直布局

```html
<vro-van-datetime-range-select-picker
  v-model="range"
  direction="column"
  format="yyyy-MM-dd hh:mm"
  label="活动时间"
  start-placeholder="请选择开始时间"
  end-placeholder="请选择结束时间"
/>
```

### 禁用和只读

```html
<vro-van-datetime-range-select-picker v-model="range" disabled label="禁用" />
<vro-van-datetime-range-select-picker v-model="range" readonly label="只读" />
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性和 VroVanDatetimePicker 的弹层选择属性，其中 VroVanDatetimePicker 的 `modelValue`、`title` 由当前组件接管。组件的 `modelValue` 为字符串范围数组。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanDatetimeRangeSelectPickerProps" :key="key">
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
      <td>value: [string?, string?]</td>
      <td>确认选择或清空值时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value: [string?, string?]</td>
      <td>确认选择或清空值时触发</td>
    </tr>
    <tr>
      <td>clear</td>
      <td>-</td>
      <td>点击清除按钮时触发</td>
    </tr>
    <tr>
      <td>click-prefix-icon</td>
      <td>event: MouseEvent</td>
      <td>点击 prefixIcon 时触发</td>
    </tr>
    <tr>
      <td>click-suffix-icon</td>
      <td>event: MouseEvent</td>
      <td>点击 suffixIcon 时触发</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

支持 VroVanCell 的插槽，并额外支持以下插槽。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>start</td>
      <td>自定义开始日期时间内容</td>
    </tr>
    <tr>
      <td>end</td>
      <td>自定义结束日期时间内容</td>
    </tr>
    <tr>
      <td>separator</td>
      <td>自定义分隔内容</td>
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
      <td>--vro-van-datetime-range-select-picker-gap</td>
      <td>10px</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-value-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-disabled-color</td>
      <td>var(--vro-van-disabled-color)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-readonly-color</td>
      <td>var(--vro-van-readonly-color)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-separator-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-datetime-range-select-picker-clear-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import {
    VroVanDatetimeRangeSelectPicker,
    vroVanDatetimeRangeSelectPickerProps,
  } from '.'
  import { parseType } from '../utils'
</script>
