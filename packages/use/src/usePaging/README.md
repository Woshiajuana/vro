# usePaging

### 介绍

用于管理分页列表请求状态，内置刷新、加载更多、错误状态和完成状态。

## 代码演示

### 基础用法

```ts
import { usePaging } from '@vrojs/use'

const { pagingData, pagingStatus, pagingRefresh, pagingLoad } = usePaging(async ([page, size]) => {
  const res = await fetch(`/api/list?page=${page}&size=${size}`)
  return res.json()
})
```

### 立即加载

```ts
usePaging(fetchList, {
  immediate: true,
  initialStatus: {
    pagingSize: 20,
  },
})
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
      <td>task</td>
      <td>UsePagingTask</td>
      <td>分页请求函数</td>
    </tr>
    <tr>
      <td>options</td>
      <td>UsePagingOptions</td>
      <td>配置项</td>
    </tr>
  </tbody>
</table>

### 配置项 Options

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>initialStatus</td>
      <td>分页状态初始值</td>
    </tr>
    <tr>
      <td>immediate</td>
      <td>是否在 onBeforeMount 时立即刷新，默认 false</td>
    </tr>
    <tr>
      <td>scrollSelector</td>
      <td>刷新第一页时滚动到顶部的元素选择器，默认 .hor-scroll</td>
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
      <td>pagingFinished</td>
      <td>是否已加载全部数据</td>
    </tr>
    <tr>
      <td>pagingData</td>
      <td>分页列表数据</td>
    </tr>
    <tr>
      <td>pagingStatus</td>
      <td>分页状态</td>
    </tr>
    <tr>
      <td>pagingRefresh</td>
      <td>刷新第一页</td>
    </tr>
    <tr>
      <td>pagingLoad</td>
      <td>加载下一页</td>
    </tr>
    <tr>
      <td>pagingReset</td>
      <td>重置分页状态</td>
    </tr>
  </tbody>
</table>
