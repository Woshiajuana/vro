# VroVanField

### 介绍

基于 VroVanCell 和 VroInput 组合的表单输入项。组件采用平铺 props 设计，可直接传入单元格属性和输入框属性，适用于移动端表单场景。

## 代码演示

### 基础用法

```html
<vro-van-field v-model="username" label="用户名" placeholder="请输入用户名" clearable />
<vro-van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
```

### 数字输入

```html
<vro-van-field v-model="amount" type="decimal" label="金额" placeholder="请输入金额" unit="元" />
<vro-van-field v-model="quantity" type="number" label="数量" placeholder="请输入数量" />
```

### 单元格能力

```html
<vro-van-field
  v-model="phone"
  required
  label="手机号"
  placeholder="请输入手机号"
  prefix-icon="van-icon-phone-o"
  suffix-icon="van-icon-contact-o"
  clearable
/>

<vro-van-field v-model="address" direction="column" label="详细地址" placeholder="请输入地址" />
<vro-van-field v-model="readonlyValue" label="只读字段" readonly arrow />
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性和 VroInput 的输入类属性，其中 VroVanCell 的 `value`、`formatter` 不会作为 Field 顶层属性暴露。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanFieldProps" :key="key">
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
      <td>输入值变化或清空时触发</td>
    </tr>
    <tr>
      <td>input</td>
      <td>event: InputEvent</td>
      <td>输入时触发</td>
    </tr>
    <tr>
      <td>blur</td>
      <td>event: FocusEvent</td>
      <td>失焦时触发</td>
    </tr>
    <tr>
      <td>clear</td>
      <td>-</td>
      <td>点击清除按钮时触发</td>
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
      <td>自定义输入区域内容</td>
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
      <td>icon-default</td>
      <td>自定义 prefixIcon 图标的默认插槽内容</td>
    </tr>
    <tr>
      <td>label</td>
      <td>自定义标题内容</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>自定义输入区域后置内容，会覆盖 suffixIcon 渲染的图标</td>
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
      <td>--vro-van-field-input-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-field-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-field-disabled-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-field-clear-color</td>
      <td>var(--van-gray-5)</td>
    </tr>
    <tr>
      <td>--vro-van-field-unit-color</td>
      <td>var(--van-text-color-2)</td>
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
      <td>input</td>
      <td>底层 input 元素</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanField, vroVanFieldProps } from '.'
  import { parseType } from '../utils'
</script>
