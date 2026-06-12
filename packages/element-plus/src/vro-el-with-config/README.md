# VroElWithConfig

### 介绍

用于给局部内容或动态组件包裹一层 `ElConfigProvider`。传入 `is` 时会渲染对应动态组件，并将 `attrs`、插槽透传给内部组件；未传入 `is` 时直接渲染默认插槽。

## 代码演示

### 基础用法

```html
<vro-el-with-config :el-config-props="{ size: 'large' }">
  <el-button>按钮</el-button>
</vro-el-with-config>
```

### 动态组件

```html
<vro-el-with-config :is="ElButton" :el-config-props="{ size: 'small' }" type="primary">
  动态按钮
</vro-el-with-config>
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
    <tr v-for="(item, key) in vroElWithConfigProps" :key="key">
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
      <td>默认内容；传入 is 时会透传给动态组件</td>
    </tr>
  </tbody>
</table>

### 实例代理

传入 `is` 时，组件实例会代理内部动态组件暴露的方法和属性。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElWithConfig, vroElWithConfigProps } from '.'
  import { parseType } from '../utils'
</script>
