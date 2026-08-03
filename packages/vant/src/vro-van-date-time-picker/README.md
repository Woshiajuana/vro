# VroVanDateTimePicker

### 介绍

基于 Vant Picker 和 Popup 封装的日期时间选择器。通过 `format` 控制展示年月日时分秒列，并在确认后输出格式化后的日期时间字符串。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell
  v-model="dateTime"
  label="日期时间"
  placeholder="请选择日期时间"
  @click="open"
/>
<vro-van-date-time-picker ref="dateTimePickerRef" />
```

```ts
const open = () => {
  dateTimePickerRef.value
    ?.show({
      title: '选择日期时间',
      modelValue: dateTime.value,
    })
    .then((result) => {
      dateTime.value = result.value
    })
}
```

### 日期格式

```ts
dateTimePickerRef.value?.show({
  title: '选择日期',
  format: 'yyyy-MM-dd',
  modelValue: date.value,
})
```

### 时间格式

```ts
dateTimePickerRef.value?.show({
  title: '选择时间',
  format: 'hh:mm',
  modelValue: time.value,
})
```

### 函数式调用

```ts
showVroVanDateTimePicker({
  title: '选择开始时间',
  format: 'yyyy-MM-dd hh:mm',
  modelValue: startTime.value,
}).then((result) => {
  startTime.value = result.value
})
```

## API

### 属性 Props

支持 Vant Picker 的全部属性，并额外支持以下属性。

`format` 支持 `yyyy`、`MM`、`dd`、`hh`、`mm`、`ss`。包含的字段会决定展示的选择列，例如 `yyyy-MM` 只展示年、月列。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanDateTimePickerProps" :key="key">
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
      <td>选中值变化时触发</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>params: VroVanDateTimePickerResult</td>
      <td>点击确认按钮时触发</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>params?: PickerCancelEventParams | unknown</td>
      <td>点击取消按钮或关闭弹层时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>params: PickerChangeEventParams</td>
      <td>选项改变时触发</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>-</td>
      <td>弹层关闭动画结束时触发</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

支持 Vant Picker 的插槽。

### 实例方法

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹层，支持动态传入配置，并返回确认结果 Promise</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭弹层</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>确认当前选择</td>
    </tr>
    <tr>
      <td>vanPickerRef</td>
      <td>底层 VanPicker 实例</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanDateTimePicker, vroVanDateTimePickerProps } from '.'
  import { parseType } from '../utils'
</script>
