# useTransfer

### 介绍

用于统一处理点击后的跳转或自定义函数执行。可以通过配置禁用、跳转路由或执行回调。

## 代码演示

### 基础用法

```ts
import { useTransfer } from '@vrojs/use'

const transfer = useTransfer()

transfer({
  path: '/user',
  query: {
    id: 1,
  },
})
```

### 执行函数

```ts
transfer({
  fn() {
    console.log('submit')
  },
})
```

## API

### 配置项 TransferOptions

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>是否禁用本次处理</td>
    </tr>
    <tr>
      <td>to</td>
      <td>vue-router 路由跳转配置</td>
    </tr>
    <tr>
      <td>path</td>
      <td>跳转路径</td>
    </tr>
    <tr>
      <td>replace</td>
      <td>是否替换当前路由记录</td>
    </tr>
    <tr>
      <td>query</td>
      <td>路由 query 参数</td>
    </tr>
    <tr>
      <td>params</td>
      <td>路由 params 参数</td>
    </tr>
    <tr>
      <td>fn</td>
      <td>自定义执行函数</td>
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
      <td>transfer</td>
      <td>执行跳转或回调的方法</td>
    </tr>
  </tbody>
</table>
