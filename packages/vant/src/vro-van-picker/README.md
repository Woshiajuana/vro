# VroVanPicker

### 介绍

基于 Vant Picker 和 Popup 封装的弹出选择器。支持实例方法打开、动态传入 Picker 配置、筛选选项和自定义筛选区域，适合配合 TriggerCell 等触发型表单项使用。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell v-model="cityText" label="城市" placeholder="请选择城市" @click="openCity" />
<vro-van-picker ref="pickerRef" />
```

```ts
const openCity = () => {
  pickerRef.value?.show({
    title: '选择城市',
    columns: cityColumns,
    modelValue: cityValue.value,
  })
}
```

### 可筛选

```html
<vro-van-trigger-cell
  v-model="filterCityText"
  label="出发地"
  placeholder="请选择出发地"
  @click="openFilterCity"
/>
```

```ts
const openFilterCity = () => {
  pickerRef.value?.show({
    title: '选择出发地',
    columns: cityColumns,
    filterable: true,
  })
}
```

### 多列选择

```html
<vro-van-trigger-cell v-model="areaText" label="地区" placeholder="请选择地区" @click="openArea" />
```

```ts
const openArea = () => {
  pickerRef.value?.show({
    title: '选择地区',
    columns: areaColumns,
    modelValue: areaValue.value,
  })
}
```

### 自定义筛选

```html
<vro-van-picker ref="pickerRef">
  <template #filter="{ keyword, placeholder, setKeyword }">
    <input
      :value="keyword"
      :placeholder="placeholder"
      @input="setKeyword($event.target.value)"
    />
  </template>
</vro-van-picker>
```

## API

### 属性 Props

支持 Vant Picker 的全部属性，并额外支持以下属性。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanPickerProps" :key="key">
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
      <td>自定义 Picker 顶部内容</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>自定义筛选区域，参数为 { keyword, placeholder, setKeyword }</td>
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
      <td>value: unknown[]</td>
      <td>选中值变化时触发</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>params: VroVanPickerResult</td>
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
      <td>click-option</td>
      <td>option: PickerOption</td>
      <td>点击选项时触发</td>
    </tr>
    <tr>
      <td>scroll-into</td>
      <td>option: PickerOption</td>
      <td>选项滚动到可视区域时触发</td>
    </tr>
  </tbody>
</table>

### 实例方法

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹层，支持动态传入 Picker 和 Popup 配置，并返回确认结果 Promise</td>
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
      <td>picker</td>
      <td>底层 VanPicker 实例</td>
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
      <td>--vro-van-picker-filter-padding</td>
      <td>8px 16px 12px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-filter-height</td>
      <td>36px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-filter-background</td>
      <td>var(--van-background-2)</td>
    </tr>
    <tr>
      <td>--vro-van-picker-filter-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
    <tr>
      <td>--vro-van-picker-filter-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-picker-filter-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanPicker, vroVanPickerProps } from '.'
  import { parseType } from '../utils'
</script>
