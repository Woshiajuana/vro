# VroVanTriggerCell

### 介绍

基于 VroVanCell 的触发型单元格。适合用于日期、地区、状态等点击后打开选择器或执行自定义动作的表单项，并支持展示值和清空值。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell
  v-model="city"
  label="城市"
  placeholder="请选择城市"
  @click="city = '杭州'"
/>
```

### 可清空

```html
<vro-van-trigger-cell
  v-model="date"
  clearable
  label="日期"
  placeholder="请选择日期"
  @click="date = '2026-07-23'"
/>
```

### 格式化

```html
<vro-van-trigger-cell
  v-model="amount"
  label="金额"
  placeholder="请选择金额"
  :formatter="(value) => `${value} 元`"
/>
```

`modelValue` 支持任意类型的值，可通过 `formatter` 自定义展示内容。

```html
<vro-van-trigger-cell
  v-model="user"
  label="用户"
  placeholder="请选择用户"
  :formatter="(value) => value.name"
/>
```

### 禁用和只读

```html
<vro-van-trigger-cell v-model="disabledValue" disabled label="禁用" placeholder="请选择" />
<vro-van-trigger-cell v-model="readonlyValue" readonly label="只读" placeholder="请选择" />
```

### 自定义内容

```html
<vro-van-trigger-cell v-model="status" label="状态" placeholder="请选择状态">
  <template #default="{ displayValue, isEmpty, placeholder }">
    <span>{{ isEmpty ? placeholder : displayValue }}</span>
  </template>
</vro-van-trigger-cell>
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性，其中 VroVanCell 的 `value`、`formatter`、`arrow`、`clickable` 会由 TriggerCell 重新定义。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanTriggerCellProps" :key="key">
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
      <td>value: any</td>
      <td>清空值时触发</td>
    </tr>
    <tr>
      <td>click</td>
      <td>event: MouseEvent</td>
      <td>点击组件且非 disabled/readonly 时触发</td>
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

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>default</td>
      <td>自定义右侧展示内容，参数为 { value, displayValue, placeholder, isEmpty }</td>
    </tr>
    <tr>
      <td>prepend</td>
      <td>自定义整体前置内容</td>
    </tr>
    <tr>
      <td>prefix</td>
      <td>自定义标题前置内容，会覆盖 prefixIcon 渲染的图标</td>
    </tr>
    <tr>
      <td>prefix-icon-default</td>
      <td>自定义 prefixIcon 图标的默认插槽内容</td>
    </tr>
    <tr>
      <td>label</td>
      <td>自定义标题内容</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>自定义右侧后置内容，会覆盖 suffixIcon 渲染的图标</td>
    </tr>
    <tr>
      <td>suffix-icon-default</td>
      <td>自定义 suffixIcon 图标的默认插槽内容</td>
    </tr>
    <tr>
      <td>append</td>
      <td>自定义整体后置内容</td>
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
      <td>--vro-van-trigger-cell-value-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-trigger-cell-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-trigger-cell-disabled-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-trigger-cell-clear-color</td>
      <td>var(--van-gray-5)</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanTriggerCell, vroVanTriggerCellProps } from '.'
  import { parseType } from '../utils'
</script>
