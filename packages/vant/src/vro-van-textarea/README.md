# VroVanTextarea

### 介绍

基于 VroVanCell 和原生 textarea 组合的多行文本输入项。组件采用平铺 props 设计，可直接传入单元格属性和文本域属性，适用于移动端表单场景。

## 代码演示

### 基础用法

```html
<vro-van-textarea v-model="message" label="留言" placeholder="请输入留言" />
```

### 字数统计

```html
<vro-van-textarea
  v-model="intro"
  label="简介"
  placeholder="请输入简介"
  maxlength="80"
  show-word-limit
/>
```

### 自适应高度

```html
<vro-van-textarea
  v-model="description"
  label="详细描述"
  placeholder="请输入详细描述"
  :autosize="{ minRows: 3, maxRows: 6 }"
  maxlength="120"
  show-word-limit
/>
```

### 单元格能力

```html
<vro-van-textarea
  v-model="remark"
  required
  label="备注"
  placeholder="请输入备注"
  prefix-icon="van-icon-edit"
/>

<vro-van-textarea v-model="readonlyValue" label="只读内容" readonly arrow />
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性和 textarea 的输入类属性，其中 VroVanCell 的 `value`、`formatter`、`direction` 不会作为 Textarea 顶层属性暴露，Textarea 内部固定使用 `direction="column"`。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanTextareaProps" :key="key">
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
      <td>输入值变化时触发</td>
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
      <td>prefix-icon-default</td>
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
      <td>--vro-van-textarea-input-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-textarea-placeholder-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-textarea-disabled-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-textarea-word-limit-color</td>
      <td>var(--van-text-color-3)</td>
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
      <td>textarea</td>
      <td>底层 textarea 元素</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanTextarea, vroVanTextareaProps } from '.'
  import { parseType } from '../utils'
</script>
