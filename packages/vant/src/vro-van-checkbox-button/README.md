# VroVanCheckboxButton

### 介绍

基于 VroVanCell 的按钮式多选组件。适合在移动端表单中用更紧凑的按钮形态展示一组选项。

## 代码演示

### 基础用法

```html
<vro-van-checkbox-button v-model="value" label="偏好" :options="['读书', '跑步', '旅行']" />
```

### 对象选项

```html
<vro-van-checkbox-button
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

### 列数和限制

```html
<vro-van-checkbox-button v-model="value" label="技能" :columns="2" :max="2" :options="options" />
```

### 使用插槽

```html
<vro-van-checkbox-button v-model="value" direction="column" label="通知方式" :options="options">
  <template #option="{ label, checked }">
    <span :class="{ 'is-checked': checked }">{{ label }}</span>
  </template>
</vro-van-checkbox-button>
```

## API

### 属性 Props

支持 VroVanCell 的展示类属性，其中 VroVanCell 的 `value`、`formatter` 不会作为 CheckboxButton 顶层属性暴露。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanCheckboxButtonProps" :key="key">
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
      <td>option</td>
      <td>自定义单个选项内容，参数为 { option, index, label, value, disabled, checked }</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanCheckboxButton, vroVanCheckboxButtonProps } from '.'
  import { parseType } from '../utils'
</script>
