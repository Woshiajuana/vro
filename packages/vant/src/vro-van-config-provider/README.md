# VroVanConfigProvider

### 介绍

为 Vro Vant 组件提供全局配置，目前用于统一内部文案。`locale` 支持局部覆盖，未传入的字段会使用默认中文文案。

## 代码演示

### 基础用法

```html
<vro-van-config-provider :locale="locale">
  <app />
</vro-van-config-provider>
```

```ts
const locale = {
  van: {
    picker: {
      filterPlaceholder: '请输入筛选内容',
    },
  },
}
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
    <tr v-for="(item, key) in vroVanConfigProviderProps" :key="key">
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
      <td>默认内容</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanConfigProvider, vroVanConfigProviderProps } from '.'
  import { parseType } from '../utils'
</script>
