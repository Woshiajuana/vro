# VroVanActionSheet

### 介绍

基于 Vant ActionSheet 封装的动作面板。支持实例方法打开、函数式调用、动态传入配置，并会返回用户选择的动作项。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell v-model="text" label="操作" placeholder="请选择操作" @click="open" />
<vro-van-action-sheet ref="actionSheetRef" />
```

```ts
const open = () => {
  actionSheetRef.value
    ?.show({
      title: '选择操作',
      actions: [
        { name: '编辑' },
        { name: '复制' },
        { name: '删除', color: '#ee0a24' },
      ],
    })
    .then(({ action }) => {
      text.value = action.name ?? ''
    })
}
```

### 函数式调用

```ts
showVroVanActionSheet({
  title: '分享给',
  actions: [
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接' },
  ],
}).then(({ action }) => {
  text.value = action.name ?? ''
})
```

### 自定义选项

```html
<vro-van-action-sheet ref="actionSheetRef" title="选择文件操作" :actions="actions">
  <template #action="{ action }">
    <span>{{ action.name }}</span>
  </template>
</vro-van-action-sheet>
```

```ts
actionSheetRef.value?.show().then(({ action }) => {
  text.value = action.name ?? ''
})
```

## API

### 属性 Props

支持 Vant ActionSheet 的全部属性。组件内部会接管 `show` 和 `closeOnClickAction` 的关闭流程，以保证实例方法和函数式调用的 Promise 结果正确。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanActionSheetProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
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
      <td>cancel</td>
      <td>reason?: unknown</td>
      <td>点击取消、关闭图标或遮罩关闭时触发</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>-</td>
      <td>弹层关闭动画结束时触发</td>
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
      <td>自定义面板内容</td>
    </tr>
    <tr>
      <td>description</td>
      <td>自定义描述内容</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>自定义取消按钮内容</td>
    </tr>
    <tr>
      <td>action</td>
      <td>自定义选项内容，参数为 { action, index }</td>
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
      <td>打开动作面板，支持动态传入配置，并返回选中结果 Promise</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭动作面板</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>确认当前选项</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanActionSheet, vroVanActionSheetProps } from '.'
  import { parseType } from '../utils'
</script>
