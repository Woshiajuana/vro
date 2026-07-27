# VroElSchemaFormDrawer

### 介绍

基于 `ElDrawer` 和 `VroElSchemaForm` 封装的抽屉表单，支持组件使用、实例调用、函数式调用以及字段插槽透传。

## 代码演示

### 基础用法

```vue
<template>
  <vro-el-schema-form-drawer ref="drawerRef" title="编辑用户" :schema="schema" />
</template>
```

### 函数调用

```ts
const data = await showVroElSchemaFormDrawer({
  title: '新建用户',
  schema,
})
```

### 自定义样式变量

```vue
<template>
  <vro-el-schema-form-drawer
    title="编辑用户"
    :schema="schema"
    :style="{
      '--vro-el-schema-form-drawer-padding': '20px',
      '--vro-el-schema-form-drawer-border-color': 'var(--el-border-color-light)',
      '--vro-el-schema-form-drawer-size': 'min(520px, 90vw)',
    }"
  />
</template>
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
    <tr v-for="(item, key) in vroElSchemaFormDrawerProps" :key="key">
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
      <td>透传给内部 VroElSchemaForm 的默认插槽</td>
    </tr>
    <tr>
      <td>[field]</td>
      <td>透传给内部 VroElSchemaForm 的字段插槽</td>
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
      <td>打开抽屉</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭抽屉</td>
    </tr>
    <tr>
      <td>elDrawer</td>
      <td>内部 ElDrawer 实例</td>
    </tr>
    <tr>
      <td>vroElSchemaForm</td>
      <td>内部 VroElSchemaForm 实例</td>
    </tr>
  </tbody>
</table>

### 样式变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>--vro-el-schema-form-drawer-padding</td>
      <td>20px</td>
      <td>抽屉头部和底部区域内边距</td>
    </tr>
    <tr>
      <td>--vro-el-schema-form-drawer-border-color</td>
      <td>var(--el-border-color)</td>
      <td>抽屉头部和底部分割线颜色</td>
    </tr>
    <tr>
      <td>--vro-el-schema-form-drawer-size</td>
      <td>520px</td>
      <td>抽屉默认尺寸，会作为 size 属性默认值使用</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaFormDrawer, vroElSchemaFormDrawerProps } from '.'
  import { parseType } from '../utils'
</script>
