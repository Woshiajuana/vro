# useParams

### 介绍

用于获取当前路由的 `params`，并通过泛型补充参数类型。

## 代码演示

### 基础用法

```ts
import { useParams } from '@vrojs/use'

const params = useParams<{ id: string }>()
```

## API

### 返回值

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>params</td>
      <td>当前路由 params</td>
    </tr>
  </tbody>
</table>
