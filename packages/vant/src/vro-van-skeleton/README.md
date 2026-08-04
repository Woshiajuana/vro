# VroVanSkeleton

### 介绍

用于承载列表、详情页等异步内容的状态容器。内置加载、错误、空数据和正常内容四种展示状态，并支持通过插槽自定义状态内容。

## 代码演示

### 加载状态

```html
<vro-van-skeleton loading loading-description="正在加载数据" />
```

### 错误状态

```html
<vro-van-skeleton
  :error="error"
  error-btn-text="重新加载"
  :formatter="formatError"
  @refresh="loadData"
  @update:error="error = $event"
/>
```

### 空状态

```html
<vro-van-skeleton empty-description="暂无订单" empty-btn-text="去刷新" @refresh="loadData" />
```

### 正常内容

```html
<vro-van-skeleton :empty="false" :loading="false">
  <div>这里展示真实内容</div>
</vro-van-skeleton>
```

### 自定义状态

```html
<vro-van-skeleton :error="error">
  <template #error="{ refresh }">
    <div>
      <p>网络不太稳定</p>
      <van-button @click="refresh">重试</van-button>
    </div>
  </template>
</vro-van-skeleton>
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
    <tr v-for="(item, key) in vroVanSkeletonProps" :key="key">
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
      <td>refresh</td>
      <td>-</td>
      <td>点击刷新按钮时触发</td>
    </tr>
    <tr>
      <td>update:error</td>
      <td>value: unknown</td>
      <td>点击错误状态刷新按钮时触发，用于清空错误状态</td>
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

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-min-height</td>
      <td>240px</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-color</td>
      <td>var(--van-text-color-2)</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-description-margin-top</td>
      <td>16px</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-description-color</td>
      <td>var(--van-text-color-2)</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-description-font-size</td>
      <td>var(--van-font-size-md)</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-description-line-height</td>
      <td>var(--van-line-height-md)</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-error-color</td>
      <td>var(--van-danger-color)</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-button-padding</td>
      <td>6px 32px</td>
    </tr>
    <tr>
      <td>--vro-van-skeleton-button-color</td>
      <td>var(--van-text-color-2)</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanSkeleton, vroVanSkeletonProps } from '.'
  import { parseType } from '../utils'
</script>
