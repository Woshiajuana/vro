# VroElSchemaDescs

### 介绍

基于 Element Plus `ElDescriptions` 封装的描述列表组件。通过 `schema` 描述描述项的取值、映射、格式化、隐藏和自定义渲染，支持分组、按数据源生成，并保留 `ElDescriptions`、`ElDescriptionsItem` 的透传能力。

## 代码演示

### 基础用法

```html
<vro-el-schema-descs :data="data" :schema="schema" />
```

```ts
const data = {
  name: '张三',
  company: {
    name: 'DaySnap',
    address: '杭州市西湖区',
  },
  createdAt: '2026-11-18 10:00:00',
}

const schema: VroElSchemaDescsSchema<typeof data> = [
  { label: '姓名', prop: 'name' },
  { label: '所属公司', prop: 'company.name' },
  { label: '公司地址', prop: 'company.address' },
  { label: '创建时间', prop: 'createdAt' },
]
```

`prop` 支持 `a.b.c`、`list[0].name` 等路径写法，取不到值时回落到字段自身的 `value`。

### 枚举映射与单位

`map` 把原始值替换成展示值，`mapValueKey` 指定映射对象的取值字段，默认 `label`；设为 `false` 时直接使用映射结果。

```ts
const statusMap = {
  enabled: { label: '已启用', type: 'success' },
  disabled: { label: '已停用', type: 'danger' },
}

const schema: VroElSchemaDescsSchema<Detail> = [
  { label: '状态', prop: 'status', map: statusMap },
  { label: '积分', prop: 'score', unit: '分' },
  { label: '备注', prop: 'remark' },
  { label: '离职时间', prop: 'leaveAt', defaultValue: '在职' },
]
```

`unit` 只在值非空时拼接，空值（`''`、`null`、`undefined`）统一回落到 `defaultValue`，默认 `-`。`0`、`false` 不会被当作空值。

### 值处理

`get` 用于取值后预处理，`formatter` 用于最终格式化，两者入参都包含完整数据源。

```ts
const schema: VroElSchemaDescsSchema<Detail> = [
  {
    label: '姓名',
    prop: 'name',
    get: (value) => `${value}先生`,
  },
  {
    label: '标签',
    prop: 'tags',
    formatter: (value) => value.join('、'),
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    formatter: (value, data) => `${data.name} / ${value}`,
  },
]
```

### 条件隐藏

`hidden` 为 `true` 时固定隐藏，为函数时按原始值和完整数据源决定是否隐藏。

```ts
const schema: VroElSchemaDescsSchema<Detail> = [
  { label: '姓名', prop: 'name' },
  { label: '备注', prop: 'remark', hidden: true },
  {
    label: '离职时间',
    prop: 'leaveAt',
    hidden: (_, data) => data.status === 'enabled',
  },
]
```

### 自定义渲染

`render` 接收处理后的展示值和完整数据源，返回 vnode，由使用方完全掌控渲染结果。

```ts
import { h } from 'vue'

const schema: VroElSchemaDescsSchema<Detail> = [
  {
    label: '状态',
    prop: 'status',
    map: statusMap,
    render: (value, data) => h(ElTag, { type: statusMap[data.status].type }, value),
  },
  {
    label: '积分',
    prop: 'score',
    unit: '分',
    render: (value) => h(ElTag, { type: 'warning' }, value),
  },
]
```

### 分组与动态 schema

schema 的每一项可以是描述项、嵌套数组分组或返回分组 schema 的函数，渲染时会按顺序拍平；组件级 `schema` 本身也支持函数写法。

```ts
const schema: VroElSchemaDescsSchema<Detail> = [
  [
    { label: '姓名', prop: 'name' },
    { label: '状态', prop: 'status', map: statusMap },
  ],
  ({ status }) => [
    { label: '创建时间', prop: 'createdAt' },
    ...(status === 'enabled'
      ? [{ label: '启用时间', prop: 'enabledAt' }]
      : [{ label: '离职时间', prop: 'leaveAt' }]),
  ],
]

const getSchema = (data: Detail): VroElSchemaDescsSchema<Detail> => [
  { label: `${data.name} 的公司`, prop: 'company.name' },
  { label: '公司地址', prop: 'company.address' },
]
```

```html
<vro-el-schema-descs :data="data" :schema="schema" />
<vro-el-schema-descs :data="data" :schema="getSchema" />
```

### 自定义插槽

`item` 插槽优先级最高，参数为当前描述项和完整数据源。

```html
<vro-el-schema-descs :data="data" :schema="schema">
  <template #item="{ item }">
    <span>{{ item.label }}：{{ item.value }}</span>
  </template>
</vro-el-schema-descs>
```

### 透传属性

`descProps` 透传给 `ElDescriptions`，`itemProps` 透传给所有 `ElDescriptionsItem`，字段级 `itemProps` 优先级更高。

```html
<vro-el-schema-descs
  :data="data"
  :schema="schema"
  :desc-props="{ column: 2, direction: 'vertical' }"
  :item-props="{ align: 'center' }"
/>
```

## API

### 属性 Props

支持 Element Plus `ElDescriptions` 的全部属性（通过 `descProps` 传递），并额外支持以下属性。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroElSchemaDescsProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### Schema

`schema` 支持三种写法，渲染时按顺序拍平成一维描述项：

```ts
export type VroElSchemaDescsSchema<T = any> = (
  | VroElSchemaDescsItemField<T>
  | VroElSchemaDescsSchema<T>
  | ((data: T) => VroElSchemaDescsSchema<T>)
)[]
```

### Item

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>key</td>
      <td>string | number</td>
      <td>唯一标识，缺省时依次取 prop、索引</td>
    </tr>
    <tr>
      <td>label</td>
      <td>string</td>
      <td>标签文本</td>
    </tr>
    <tr>
      <td>prop</td>
      <td>string</td>
      <td>数据源字段路径，支持 a.b.c、list[0].name 写法</td>
    </tr>
    <tr>
      <td>value</td>
      <td>any</td>
      <td>字段值，配置 prop 时作为取不到值的兜底</td>
    </tr>
    <tr>
      <td>get</td>
      <td>(value, data) => any</td>
      <td>值预处理，入参为原始值和完整数据源</td>
    </tr>
    <tr>
      <td>map</td>
      <td>Record&lt;string | number, any&gt;</td>
      <td>枚举映射，展示前把原始值替换成映射值</td>
    </tr>
    <tr>
      <td>mapValueKey</td>
      <td>string | false</td>
      <td>枚举映射取值字段，false 表示直接使用映射结果，默认 label</td>
    </tr>
    <tr>
      <td>formatter</td>
      <td>(value, data) => any</td>
      <td>值格式化，在 get、map 之后执行</td>
    </tr>
    <tr>
      <td>defaultValue</td>
      <td>any</td>
      <td>空值兜底，默认 -</td>
    </tr>
    <tr>
      <td>unit</td>
      <td>string</td>
      <td>单位，拼接在值后面，空值不拼接</td>
    </tr>
    <tr>
      <td>render</td>
      <td>(value, data) =&gt; VNodeChild</td>
      <td>自定义渲染，入参为展示值和完整数据源，返回 vnode，优先级高于默认文本</td>
    </tr>
    <tr>
      <td>itemProps</td>
      <td>Partial&lt;DescriptionItemProps&gt;</td>
      <td>当前描述项的 ElDescriptionsItem 属性，优先级高于组件级 itemProps</td>
    </tr>
    <tr>
      <td>hidden</td>
      <td>boolean | (value, data) => boolean</td>
      <td>是否隐藏，入参为处理后的原始值和完整数据源</td>
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
      <td>item</td>
      <td>自定义描述项内容，参数为 { item, data, index }，优先级高于 render 和默认文本</td>
    </tr>
  </tbody>
</table>

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-el-schema-descs-label-color</td>
      <td>var(--el-text-color-regular)</td>
    </tr>
    <tr>
      <td>--vro-el-schema-descs-content-color</td>
      <td>var(--el-text-color-primary)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSchemaDescs, vroElSchemaDescsProps } from '.'
  import { parseType } from '../utils'
</script>
