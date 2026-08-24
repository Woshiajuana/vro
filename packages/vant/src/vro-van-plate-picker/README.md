# VroVanPlatePicker

### 介绍

用于选择车牌省份简称的底部弹层选择器。顶部操作栏基于 VroVanPickerToolbar，支持额外选项、自定义标题按钮文案、实例方法打开和函数式调用。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell
  v-model="plateText"
  label="车牌前缀"
  placeholder="请选择车牌前缀"
  @click="openPlate"
/>
<vro-van-plate-picker ref="platePickerRef" />
```

```ts
const openPlate = () => {
  platePickerRef.value?.show({ value: plateText.value }).then((result) => {
    plateText.value = result.value
  })
}
```

### 隐藏额外选项

```ts
platePickerRef.value?.show({
  title: '选择省份简称',
  value: plateText.value,
  showExtra: false,
})
```

### 自定义额外选项

```ts
platePickerRef.value?.show({
  title: '选择车牌状态',
  value: plateText.value,
  extraKeys: ['新能源', '临牌'],
})
```

### 函数式调用

```ts
showVroVanPlatePicker({
  value: plateText.value,
}).then((result) => {
  plateText.value = result.value
})
```

## API

### 属性 Props

`value` 仅作为打开弹层时的初始选中值，确认结果通过 `show` 返回的 Promise 获取。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanPlatePickerProps" :key="key">
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
      <td>closed</td>
      <td>-</td>
      <td>弹层关闭动画结束时触发</td>
    </tr>
  </tbody>
</table>

### 确认结果 Result

点击确认且当前已有选中值时，`show` 返回的 Promise 会 resolve 以下结果；点击取消、关闭弹层或未选择直接确认时，Promise 会 reject。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>value</td>
      <td>string</td>
      <td>当前选中的车牌前缀或额外选项</td>
    </tr>
    <tr>
      <td>type</td>
      <td>'plate' | 'extra'</td>
      <td>当前选中值的来源类型</td>
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
      <td>打开弹层，支持动态传入配置，并返回确认结果 Promise</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭弹层</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>确认当前选择，未选择时会按取消处理</td>
    </tr>
  </tbody>
</table>

### CSS 变量

顶部操作栏样式可参考 VroVanPickerToolbar 的 CSS 变量。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-keys-padding</td>
      <td>16px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-height</td>
      <td>40px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-gap</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-radius</td>
      <td>4px</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-background</td>
      <td>var(--van-background)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-active-color</td>
      <td>var(--van-primary-color)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-key-active-background</td>
      <td>color-mix(in srgb, var(--van-primary-color) 10%, #fff)</td>
    </tr>
    <tr>
      <td>--vro-van-plate-picker-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanPlatePicker, vroVanPlatePickerProps } from '.'
  import { parseType } from '../utils'
</script>
