# VroElSkeleton

### 介绍

用于统一处理内容区域的加载、错误和空状态。`loading` 时显示骨架屏，`error` 时显示错误结果，`empty` 时显示空状态，其余情况渲染默认内容。

## 代码演示

### 基础用法

```html
<vro-el-skeleton :loading="loading" :error="error" :empty="empty" @refresh="refresh">
  <div>内容</div>
</vro-el-skeleton>
```

### 自定义状态内容

```html
<vro-el-skeleton :error="error">
  <template #error="{ refresh }">
    <el-result icon="warning" title="加载失败">
      <template #extra>
        <el-button type="primary" @click="refresh">重试</el-button>
      </template>
    </el-result>
  </template>
</vro-el-skeleton>
```

### 国际化文案

默认文案通过 `VroElConfigProvider` 的 `locale` 配置，也可以通过组件属性覆盖。

```html
<vro-el-config-provider :locale="locale">
  <vro-el-skeleton empty />
</vro-el-config-provider>
```

```ts
const locale = {
  el: {
    skeleton: {
      emptyDescription: 'No data',
      emptyBtnText: 'Reload',
      errorTitle: 'Something went wrong',
      errorBtnText: 'Retry',
      loadingDescription: 'Loading...',
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
    <tr v-for="(item, key) in vroElSkeletonProps" :key="key">
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
      <td>正常内容</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>自定义加载状态内容</td>
    </tr>
    <tr>
      <td>error</td>
      <td>自定义错误状态内容，参数为 { error, refresh }</td>
    </tr>
    <tr>
      <td>empty</td>
      <td>自定义空状态内容，参数为 { refresh }</td>
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
      <td>refresh</td>
      <td>-</td>
      <td>点击默认错误或空状态按钮时触发</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroElSkeleton, vroElSkeletonProps } from '.'
  import { parseType } from '../utils'
</script>
