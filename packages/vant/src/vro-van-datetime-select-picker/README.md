# VroVanDatetimeSelectPicker

### 介绍

基于 VroVanTriggerCell 和 VroVanDatetimePicker 封装的日期时间选择触发组件。适合在移动端表单中点击单元格后弹出日期时间选择器，并在确认后自动回写和展示选中值。

## 代码演示

### 基础用法

```html
<vro-van-datetime-select-picker
  v-model="datetime"
  label="日期时间"
  placeholder="请选择日期时间"
  title="选择日期时间"
/>
```

### 日期格式

```html
<vro-van-datetime-select-picker
  v-model="date"
  format="yyyy-MM-dd"
  label="日期"
  title="选择日期"
/>
```

### 返回 Date

```html
<vro-van-datetime-select-picker
  v-model="date"
  format="yyyy-MM-dd hh:mm"
  label="开始时间"
  title="选择开始时间"
  value-type="date"
/>
```

### 可选范围

```html
<vro-van-datetime-select-picker
  v-model="datetime"
  format="yyyy-MM-dd hh:mm"
  label="预约时间"
  title="选择预约时间"
  :max="maxDate"
  :min="minDate"
/>
```

### 禁用和只读

```html
<vro-van-datetime-select-picker v-model="datetime" disabled label="禁用" />
<vro-van-datetime-select-picker v-model="datetime" readonly label="只读" />
```

## API

### 属性 Props

支持 VroVanTriggerCell 的展示类属性和 VroVanDatetimePicker 的弹层选择属性，其中 VroVanDatetimePicker 的 `modelValue` 由当前组件接管。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanDatetimeSelectPickerProps" :key="key">
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
      <td>value: string | Date | any</td>
      <td>确认选择或清空值时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value: any, result?: VroVanDatetimePickerResult</td>
      <td>确认选择或清空值时触发</td>
    </tr>
    <tr>
      <td>clear</td>
      <td>-</td>
      <td>点击清除按钮时触发</td>
    </tr>
    <tr>
      <td>click</td>
      <td>event: MouseEvent</td>
      <td>点击组件且非 disabled/readonly/loading 时触发</td>
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

支持 VroVanTriggerCell 的插槽。

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanDatetimeSelectPicker, vroVanDatetimeSelectPickerProps } from '.'
  import { parseType } from '../utils'
</script>
