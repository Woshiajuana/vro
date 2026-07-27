# VroElSchemaFormDialog

### 介绍

基于 `ElDialog` 和 `VroElSchemaForm` 的弹窗表单组件。组件内置校验、提交 loading、确认/取消按钮，适合编辑、新建等弹窗表单场景，也支持通过函数方式调用。

## 代码演示

### 基础用法

```html
<template>
  <el-button type="primary" @click="openDialog">打开弹窗</el-button>
  <vro-el-schema-form-dialog
    ref="dialogRef"
    title="编辑用户"
    :schema="schema"
    :request="handleRequest"
    :form-props="{ labelWidth: '90px', labelPosition: 'right' }"
    confirm-button-text="保存"
    cancel-button-text="关闭"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { VroElSchemaFormDialogInstance, VroElSchemaFormSchema } from '@vrojs/element-plus'

  const dialogRef = ref<VroElSchemaFormDialogInstance>()
  const schema = ref<VroElSchemaFormSchema>({
    username: {
      label: '用户名',
      value: '',
      is: 'ElInput',
      rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
  })

  const openDialog = () => {
    dialogRef.value?.show()
  }

  const handleRequest = async (data) => {
    return data
  }

  const handleConfirm = (data) => {
    console.log(data)
  }
</script>
```

### 函数调用

```ts
import { showVroElSchemaFormDialog } from '@vrojs/element-plus'

const data = await showVroElSchemaFormDialog({
  title: '新建用户',
  schema,
  request: async (value) => value,
})
```

### 自定义底部按钮文本

```html
<vro-el-schema-form-dialog
  ref="dialogRef"
  title="编辑用户"
  confirm-button-text="保存"
  cancel-button-text="关闭"
  :schema="schema"
/>
```

### 隐藏按钮

```html
<vro-el-schema-form-dialog
  ref="dialogRef"
  title="编辑用户"
  :schema="schema"
  :show-cancel-button="false"
  :show-confirm-button="false"
/>
```

### 字段插槽

具名插槽会转发给内部 `VroElSchemaForm`，可配合 schema 字段的 `slots` 和 `itemSlots` 使用。

```html
<vro-el-schema-form-dialog ref="dialogRef" title="编辑站点" :schema="schema">
  <template #prepend>
    <span>https://</span>
  </template>
</vro-el-schema-form-dialog>
```

```ts
const schema = {
  website: {
    label: '网址',
    value: '',
    is: 'ElInput',
    slots: {
      prepend: 'prepend',
    },
  },
}
```

### 标签宽度

通过 `formProps` 配置内部 `ElForm`，例如 `formProps.labelWidth`、`formProps.labelPosition`。

```html
<vro-el-schema-form-dialog
  ref="dialogRef"
  title="编辑用户"
  :schema="schema"
  :form-props="{ labelWidth: '90px', labelPosition: 'right' }"
/>
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
    <tr v-for="(item, key) in vroElSchemaFormDialogProps" :key="key">
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
      <td>schema 字段 slots 配置中的 key</td>
      <td>转发给内部 VroElSchemaForm 的字段组件插槽</td>
    </tr>
    <tr>
      <td>schema 字段 itemSlots 配置中的 key</td>
      <td>转发给内部 VroElSchemaForm 的 ElFormItem 插槽</td>
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
      <td>elDialog</td>
      <td>内部 ElDialog 实例</td>
    </tr>
    <tr>
      <td>vroElSchemaForm</td>
      <td>内部 VroElSchemaForm 实例</td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹窗，支持传入动态 props</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭弹窗</td>
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
      <td>confirm</td>
      <td>data</td>
      <td>确认成功后触发</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>reason</td>
      <td>关闭弹窗时触发</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>-</td>
      <td>弹窗关闭动画结束后触发</td>
    </tr>
    <tr>
      <td>change-field</td>
      <td>{ key, value }</td>
      <td>内部表单字段 change 时触发</td>
    </tr>
    <tr>
      <td>input-field</td>
      <td>{ key, value }</td>
      <td>内部表单字段 input 时触发</td>
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
      <td>--vro-el-schema-form-dialog-width</td>
      <td>520px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaFormDialog, vroElSchemaFormDialogProps } from '.'
  import { parseType } from '../utils'
</script>
