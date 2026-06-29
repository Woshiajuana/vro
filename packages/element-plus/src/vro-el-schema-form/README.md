# VroElSchemaForm

### 介绍

基于 `ElForm` 的 schema 表单封装。组件通过 `schema` 描述字段、布局、校验和事件，适合快速搭建中后台表单，同时保留 Element Plus Form、Row、Col、FormItem 的透传能力。

## 代码演示

### 基础用法

```html
<template>
  <vro-el-schema-form
    ref="refVroElSchemaForm"
    :schema="schema"
    :form-props="{ labelWidth: '90px' }"
    :col-props="{ span: 12 }"
  />
  <el-button type="primary" :loading="loading" @click="trigger">提交</el-button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useVroElSchemaForm, type VroElSchemaFormInstance } from '@vrojs/element-plus'

  const refVroElSchemaForm = ref<VroElSchemaFormInstance>()
  const { schema, loading, trigger } = useVroElSchemaForm(
    {
      username: {
        label: '用户名',
        value: '',
        is: 'ElInput',
        rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
      },
      role: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
      },
    },
    async (data) => {
      console.log(data)
    },
    {
      instanceRef: refVroElSchemaForm,
    },
  )
</script>
```

### 动态显示

```ts
const schema = {
  accountType: {
    label: '账号类型',
    value: 'personal',
    is: 'VroElRadioGroup',
    options: [
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'company' },
    ],
  },
  realName: {
    label: '姓名',
    value: '',
    is: 'ElInput',
    hidden: (_, __, metadata) => metadata.accountType.value !== 'personal',
  },
  companyName: {
    label: '企业名称',
    value: '',
    is: 'ElInput',
    hidden: (_, __, metadata) => metadata.accountType.value !== 'company',
  },
}
```

### 字段插槽

字段的 `slots` 配置用于把外部插槽转发给实际渲染组件，`itemSlots` 配置用于把外部插槽转发给 `ElFormItem`。映射对象的 key 是外部插槽名，value 是目标组件插槽名。

```html
<vro-el-schema-form :schema="schema">
  <template #prepend>
    <span>https://</span>
  </template>
  <template #websiteLabel="{ item }">
    <span>{{ item.label }}</span>
  </template>
</vro-el-schema-form>
```

```ts
const schema = {
  website: {
    label: '网址',
    value: '',
    is: 'ElInput',
    itemSlots: {
      websiteLabel: 'label',
    },
    slots: {
      prepend: 'prepend',
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
    <tr v-for="(item, key) in vroElSchemaFormProps" :key="key">
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
      <td>表单尾部内容，会渲染在 ElRow 内部</td>
    </tr>
    <tr>
      <td>schema 字段 slots 配置中的 key</td>
      <td>转发给字段组件的插槽，插槽参数包含字段组件 slot props 和 { item }</td>
    </tr>
    <tr>
      <td>schema 字段 itemSlots 配置中的 key</td>
      <td>转发给 ElFormItem 的插槽，插槽参数包含 ElFormItem slot props 和 { item }</td>
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
      <td>form</td>
      <td>ElForm 实例</td>
    </tr>
    <tr>
      <td>validate</td>
      <td>校验表单和支持 validate 的字段组件</td>
    </tr>
    <tr>
      <td>validateField</td>
      <td>校验指定字段</td>
    </tr>
    <tr>
      <td>resetFields</td>
      <td>重置表单字段</td>
    </tr>
    <tr>
      <td>extractValues</td>
      <td>提取 schema 字段值和支持 extractValues 的字段组件值</td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>触发支持 trigger 的字段组件</td>
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
      <td>change-field</td>
      <td>{ key, value }</td>
      <td>字段 change 时触发</td>
    </tr>
    <tr>
      <td>input-field</td>
      <td>{ key, value }</td>
      <td>字段 input 时触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaForm, vroElSchemaFormProps } from '.'
  import { parseType } from '../utils'
</script>
