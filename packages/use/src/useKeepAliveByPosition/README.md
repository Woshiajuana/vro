# useKeepAliveByPosition

### 介绍

基于 vue-router history `position` 维护 KeepAlive 缓存列表。

> 该方法已废弃，建议使用 `useKeepAlive`。

## 代码演示

### 基础用法

```ts
import { useKeepAliveByPosition } from '@vrojs/use'

const { includes } = useKeepAliveByPosition()
```

## API

### 参数

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>options</td>
      <td>UseKeepAliveByPositionOptions</td>
      <td>缓存配置；传入 boolean 时仅初始化全局缓存状态</td>
    </tr>
  </tbody>
</table>

### 返回值

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>keepAliveList</td>
      <td>缓存路由状态列表</td>
    </tr>
    <tr>
      <td>includes</td>
      <td>传给 KeepAlive include 的组件名称列表</td>
    </tr>
    <tr>
      <td>keep</td>
      <td>手动写入缓存状态</td>
    </tr>
  </tbody>
</table>
