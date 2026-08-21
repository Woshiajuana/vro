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
  platePickerRef.value?.show({ modelValue: plateText.value }).then((result) => {
    plateText.value = result.value
  })
}
```

### 隐藏额外选项

```ts
platePickerRef.value?.show({
  title: '选择省份简称',
  modelValue: plateText.value,
  showExtra: false,
})
```

### 自定义额外选项

```ts
platePickerRef.value?.show({
  title: '选择车牌状态',
  modelValue: plateText.value,
  extraKeys: ['新能源', '临牌'],
})
```

### 函数式调用

```ts
showVroVanPlatePicker({
  modelValue: plateText.value,
}).then((result) => {
  plateText.value = result.value
})
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
      <td>update:modelValue</td>
      <td>value: string</td>
      <td>确认选中值时触发</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>params: VroVanPlatePickerResult</td>
      <td>点击确认按钮时触发</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>params?: PickerCancelEventParams | unknown</td>
      <td>点击取消按钮或关闭弹层时触发</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>-</td>
      <td>弹层关闭动画结束时触发</td>
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
      <td>确认当前选择</td>
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
      <td>--vro-van-plate-picker-padding</td>
      <td>0 12px 16px</td>
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
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanPlatePicker, vroVanPlatePickerProps } from '.'
  import { parseType } from '../utils'
</script>
