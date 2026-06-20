# VroElTree

### 介绍

基于 `ElTree` 的受控勾选封装。组件会把全选节点和半选节点一起同步到 `v-model`，适合权限树这类需要保存父子勾选链路的场景。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-tree
    v-model="value"
    show-checkbox
    node-key="id"
    default-expand-all
    :options="options"
    :props="{ label: 'label' }"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['system'])
  const options = [
    {
      id: 'system',
      parentId: '-1',
      label: '系统管理',
      children: [
        { id: 'user', parentId: 'system', label: '用户管理' },
        { id: 'role', parentId: 'system', label: '角色管理' },
      ],
    },
  ]
</script>
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
    <tr v-for="(item, key) in vroElTreeProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

支持默认插槽，插槽参数同 `ElTree` 默认插槽。

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
      <td>value</td>
      <td>勾选节点变化时触发，返回半选和全选节点 id</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTree, vroElTreeProps } from '.'
  import { parseType } from '../utils'
</script>
