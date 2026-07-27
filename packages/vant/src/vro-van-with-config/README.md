# VroVanWithConfig

### 介绍

用于给局部内容或动态组件同时包裹 `ConfigProvider` 和 `VroVanConfigProvider`。传入 `is` 时会渲染对应动态组件，并将 `attrs`、插槽透传给内部组件；未传入 `is` 时直接渲染默认插槽。

## 代码演示

### 基础用法

## API

### 属性 Props

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanWithConfigProps" :key="key">
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

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>-</td>
      <td>透传动态组件实例</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanWithConfig, vroVanWithConfigProps } from '.'
  import { parseType } from '../utils'
</script>
