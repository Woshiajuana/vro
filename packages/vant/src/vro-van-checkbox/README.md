# VroVanCheckbox

### 介绍

基于 VroVanCell、VanCheckboxGroup 和 VanCheckbox 的选项化封装。适合在移动端表单中快速渲染一组复选项，同时保留 Cell 的展示能力。

## 代码演示

### 基础用法

```html
<vro-van-checkbox v-model="value" label="爱好" :options="['读书', '跑步', '旅行']" />
```

### 对象选项

```html
<vro-van-checkbox
  v-model="value"
  label="城市"
  label-key="name"
  value-key="id"
  :options="[
    { id: 1, name: '杭州' },
    { id: 2, name: '上海' },
    { id: 3, name: '深圳', disabled: true },
  ]"
/>
```

### 禁用和限制

```html
<vro-van-checkbox v-model="value" label="标签" :max="2" :options="options" />
<vro-van-checkbox v-model="value" disabled label="禁用" :options="options" />
```

### 使用插槽

```html
<vro-van-checkbox
  v-model="value"
  checkbox-direction="vertical"
  direction="column"
  label="通知"
  :options="options"
>
  <template #option="{ option }">
    <span>{{ option.name }}</span>
  </template>
</vro-van-checkbox>
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性和 VanCheckboxGroup 的分组属性，其中 VroVanCell 的 `value`、`formatter` 不会作为 Checkbox 顶层属性暴露。由于 `direction` 已用于 VroVanCell 布局，VanCheckboxGroup 的 `direction` 请使用 `checkboxDirection`。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanCheckboxProps" :key="key">
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
      <td>value: unknown[]</td>
      <td>选中值变化时触发</td>
    </tr>
    <tr>
      <td>change</td>
      <td>value: unknown[]</td>
      <td>选中值变化时触发</td>
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
      <td>自定义复选框组内容，会覆盖 options 自动渲染的选项</td>
    </tr>
    <tr>
      <td>option</td>
      <td>自定义单个选项内容，参数为 { option, index }</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanCheckbox, vroVanCheckboxProps } from '.'
  import { parseType } from '../utils'
</script>
