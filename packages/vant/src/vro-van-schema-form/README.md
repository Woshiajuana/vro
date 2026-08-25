# VroVanSchemaForm

### 介绍

基于 schema 配置生成移动端表单字段，外层使用 `VroVanCellGroup` 包裹，不依赖 `form`。

## 代码演示

### 基础用法

```html
<vro-van-schema-form ref="schemaFormRef" :schema="schema" :cell-group-props="{ inset: true }" />
```

```ts
import { showToast } from 'vant'
import { ref } from 'vue'
import { useVroVanSchemaForm, type VroVanSchemaFormInstance } from '@vrojs/vant'

const schemaFormRef = ref<VroVanSchemaFormInstance>()

const { schema, loading, trigger } = useVroVanSchemaForm(
  {
    name: {
      label: '姓名',
      value: '',
      is: 'VroVanField',
      rules: [{ required: true, message: '请填写姓名' }],
    },
    city: {
      label: '城市',
      value: '',
      is: 'VroVanSelectPicker',
      options: [
        { text: '杭州', value: 'hangzhou' },
        { text: '上海', value: 'shanghai' },
      ],
    },
    plateNo: {
      label: '车牌号',
      value: '',
      is: 'VroVanPlateInput',
    },
  },
  async (data) => {
    console.log(data)
    showToast('提交成功')
  },
  {
    instanceRef: schemaFormRef,
  },
)
```

### 字段插槽

```html
<vro-van-schema-form :schema="schema">
  <template #city-suffix>
    <span>热门</span>
  </template>
</vro-van-schema-form>
```

```ts
const schema = {
  city: {
    label: '城市',
    value: '',
    is: 'VroVanSelectPicker',
    slots: {
      'city-suffix': 'suffix',
    },
    options: [
      { text: '杭州', value: 'hangzhou' },
      { text: '上海', value: 'shanghai' },
    ],
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
    <tr v-for="(item, key) in vroVanSchemaFormProps" :key="key">
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
      <td>表单尾部内容，会渲染在 VroVanCellGroup 内部</td>
    </tr>
    <tr>
      <td>schema 字段 slots 配置中的插槽</td>
      <td>转发给字段组件的插槽，插槽参数包含 item 和字段组件原始参数</td>
    </tr>
  </tbody>
</table>

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>change-field</td>
      <td>字段 change 时触发</td>
      <td>{ key, value }</td>
    </tr>
    <tr>
      <td>input-field</td>
      <td>字段 input 时触发</td>
      <td>{ key, value }</td>
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
      <td>validate</td>
      <td>校验当前展示字段，返回 Promise</td>
    </tr>
    <tr>
      <td>resetFields</td>
      <td>重置 schema 字段值</td>
    </tr>
    <tr>
      <td>extractValues</td>
      <td>提取 schema 字段值，返回 Promise&lt;Record&lt;string, any&gt;&gt;</td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>触发子字段组件的 trigger 方法</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanSchemaForm, vroVanSchemaFormProps } from '.'
  import { parseType } from '../utils'
</script>
