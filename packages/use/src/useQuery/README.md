# useQuery

### 介绍

用于获取当前路由的 `query`，并通过泛型补充查询参数类型。

## 代码演示

### 基础用法

```ts
import { useQuery } from '@vrojs/use'

const query = useQuery<{ keyword?: string }>()
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
      <td>query</td>
      <td>当前路由 query</td>
    </tr>
  </tbody>
</table>
