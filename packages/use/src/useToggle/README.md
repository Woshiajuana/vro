# useToggle

### 介绍

用于管理布尔值状态，提供切换或指定状态的方法。

## 代码演示

### 基础用法

```ts
import { useToggle } from '@vrojs/use'

const [visible, toggle] = useToggle()

toggle()
toggle(false)
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
      <td>initialValue</td>
      <td>boolean</td>
      <td>初始状态，默认 false</td>
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
      <td>visible</td>
      <td>响应式布尔值</td>
    </tr>
    <tr>
      <td>toggle</td>
      <td>切换状态，也可以传入指定状态</td>
    </tr>
  </tbody>
</table>
