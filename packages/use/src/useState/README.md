# useState

### 介绍

提供类似 React `useState` 的状态管理方式，支持传入新值或基于上一次状态计算新值。

## 代码演示

### 基础用法

```ts
import { useState } from '@vrojs/use'

const [count, setCount] = useState(0)

setCount((value) => value + 1)
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
      <td>initialState</td>
      <td>S</td>
      <td>状态初始值</td>
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
      <td>state</td>
      <td>响应式状态</td>
    </tr>
    <tr>
      <td>setState</td>
      <td>更新状态，支持直接传值或函数式更新</td>
    </tr>
  </tbody>
</table>
