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

### 自定义节点

```html
<template>
  <vro-el-tree
    v-model="value"
    show-checkbox
    default-expand-all
    :options="options"
    :props="{ label: 'label' }"
  >
    <template #default="{ node, data }">
      <span>{{ node.label }} - {{ data.description }}</span>
    </template>
  </vro-el-tree>
</template>
```

### 自定义根节点

```html
<template>
  <vro-el-tree
    v-model="value"
    show-checkbox
    root-id="root"
    :options="options"
    :props="{ label: 'label' }"
  />
</template>
```

### 空数据

```html
<template>
  <vro-el-tree v-model="value" show-checkbox :options="[]">
    <template #empty>暂无权限数据</template>
  </vro-el-tree>
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
    <tr v-for="(item, key) in vroElTreeProps" :key="key">
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
      <td>参数</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>default</td>
      <td>{ node, data, store }</td>
      <td>自定义节点内容</td>
    </tr>
    <tr>
      <td>empty</td>
      <td>-</td>
      <td>自定义空数据内容</td>
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
      <td>value</td>
      <td>勾选节点变化时触发，返回半选和全选节点 id</td>
    </tr>
    <tr>
      <td>check</td>
      <td>data, info</td>
      <td>节点勾选状态变化时触发，参数同 ElTree check 事件</td>
    </tr>
  </tbody>
</table>

### 样式变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-el-tree-user-select</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElTree, vroElTreeProps } from '.'
  import { parseType } from '../utils'
</script>
