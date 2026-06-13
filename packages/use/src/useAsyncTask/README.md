# useAsyncTask

### 介绍

用于管理异步任务状态。调用 `trigger` 执行任务，并自动维护 `data`、`error`、`loading`。

## 代码演示

### 基础用法

```ts
import { useAsyncTask } from '@vrojs/use'

const { data, error, loading, trigger } = useAsyncTask(async (id: number) => {
  const res = await fetch(`/api/user/${id}`)
  return res.json()
})

trigger(1)
```

### 初始值

传入 `initialValue` 后，`data` 会使用该值作为初始数据。

```ts
const { data, trigger } = useAsyncTask(fetchList, {
  initialValue: [],
})
```

### 立即执行

`immediate` 会在 `onBeforeMount` 时执行任务，`initialParams` 用于传递首次执行参数。

```ts
const { data, loading } = useAsyncTask(fetchUser, {
  immediate: true,
  initialParams: [1],
})
```

### 错误处理

默认会捕获错误并写入 `error`，不会继续抛出。设置 `throwError` 后会在记录错误后继续抛出。

```ts
const { error, trigger } = useAsyncTask(submit, {
  throwError: true,
  onError(err) {
    console.log(err)
    return true
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
      <td>(...args) => Promise&lt;any&gt;</td>
      <td>异步任务函数</td>
    </tr>
    <tr>
      <td>options</td>
      <td>UseAsyncTaskOptions</td>
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
      <td>immediate</td>
      <td>是否在 onBeforeMount 时立即执行，默认 false</td>
    </tr>
    <tr>
      <td>activated</td>
      <td>是否在 onActivated 时执行，默认 false</td>
    </tr>
    <tr>
      <td>initialParams</td>
      <td>立即执行或 activated 执行时传给 task 的参数</td>
    </tr>
    <tr>
      <td>initialValue</td>
      <td>data 初始值</td>
    </tr>
    <tr>
      <td>throwError</td>
      <td>捕获错误后是否继续抛出，默认 false</td>
    </tr>
    <tr>
      <td>onError</td>
      <td>错误回调，返回 false 时阻断默认 error 写入逻辑</td>
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
      <td>data</td>
      <td>任务成功后的返回数据</td>
    </tr>
    <tr>
      <td>error</td>
      <td>任务错误信息</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>任务执行状态</td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>手动执行任务</td>
    </tr>
  </tbody>
</table>
