# VroVanScroll

### 介绍

基于 Vant PullRefresh 和 List 封装的滚动加载容器。支持下拉刷新、触底加载、加载完成、加载失败重试等移动端列表常见状态。

## 代码演示

### 基础用法

```html
<vro-van-scroll :finished="finished" @load="load" @refresh="refresh">
  <div v-for="item in list" :key="item">列表内容 {{ item }}</div>
</vro-van-scroll>
```

```ts
const refresh = (done: VroVanScrollDone) => {
  requestFirstPage().then(() => done())
}

const load = (done: VroVanScrollDone) => {
  requestNextPage()
    .then(() => done())
    .catch(() => done('网络异常'))
}
```

### 自定义文案

```html
<vro-van-scroll
  finished-text="已经到底了"
  loading-text="努力加载中"
  loosing-text="松开刷新"
  pulling-text="继续下拉"
  success-text="刷新完成"
/>
```

### 禁用刷新和加载

```html
<vro-van-scroll load-disabled refresh-disabled>
  <div>静态内容</div>
</vro-van-scroll>
```

### 初始化检查

```html
<vro-van-scroll immediate-check :finished="finished" @load="load">
  <div v-for="item in list" :key="item">列表内容 {{ item }}</div>
</vro-van-scroll>
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
    <tr v-for="(item, key) in vroVanScrollProps" :key="key">
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
      <td>done: VroVanScrollDone</td>
      <td>下拉刷新时触发，调用 done 结束刷新状态</td>
    </tr>
    <tr>
      <td>load</td>
      <td>done: VroVanScrollDone</td>
      <td>滚动到底部加载更多时触发，调用 done 结束加载状态</td>
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
      <td>滚动内容</td>
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
      <td>--vro-van-scroll-height</td>
      <td>100%</td>
    </tr>
    <tr>
      <td>--vro-van-scroll-state-min-height</td>
      <td>80px</td>
    </tr>
    <tr>
      <td>--vro-van-scroll-state-padding</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanScroll, vroVanScrollProps } from '.'
  import { parseType } from '../utils'
</script>
