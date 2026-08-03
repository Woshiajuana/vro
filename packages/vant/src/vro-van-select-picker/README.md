# VroVanSelectPicker

### 介绍

基于 VroVanTriggerCell 和 VroVanPicker 的选择器触发组件。适合在移动端表单中点击单元格后弹出 Picker，并在确认后自动回写和展示选中值。

## 代码演示

### 基础用法

```html
<vro-van-select-picker
  v-model="city"
  label="城市"
  placeholder="请选择城市"
  title="选择城市"
  :options="cityOptions"
/>
```

### 可筛选

```html
<vro-van-select-picker
  v-model="city"
  clearable
  filterable
  label="城市"
  placeholder="请选择城市"
  title="选择城市"
  :options="cityOptions"
/>
```

### 异步选项

```html
<vro-van-select-picker
  v-model="city"
  label="城市"
  title="选择城市"
  trigger="immediately"
  :options="loadCityOptions"
/>
```

```ts
const loadCityOptions = async () => {
  return [
    { text: '杭州', value: 'hangzhou' },
    { text: '上海', value: 'shanghai' },
  ]
}
```

`trigger="lazy"` 时会在点击后加载选项。如果需要根据已有值立即展示选中文案，建议使用 `trigger="immediately"`，或通过 `formatter` 自定义展示内容。

### 禁用和只读

```html
<vro-van-select-picker v-model="city" disabled label="禁用" :options="cityOptions" />
<vro-van-select-picker v-model="city" readonly label="只读" :options="cityOptions" />
```

## API

### 属性 Props

支持 VroVanTriggerCell 的展示类属性和 VroVanPicker 的弹层选择属性，其中 VroVanPicker 的 `columns` 由 `options` 接管。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanSelectPickerProps" :key="key">
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
      <td>value: unknown</td>
      <td>确认选择或清空值时触发</td>
    </tr>
    <tr>
      <td>clear</td>
      <td>-</td>
      <td>点击清除按钮时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value: any</td>
      <td>确认选择或清空值时触发</td>
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
  import { VroVanSelectPicker, vroVanSelectPickerProps } from '.'
  import { parseType } from '../utils'
</script>
