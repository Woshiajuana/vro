# useKeepAlive

### 介绍

结合 Vue `KeepAlive` 组件和 vue-router，根据路由前进、后退维护需要缓存的组件名称列表。

## 代码演示

### 基础用法

```ts
import { useKeepAlive } from '@vrojs/use'

const { includes } = useKeepAlive()
```

```vue
<KeepAlive :include="includes">
  <RouterView />
</KeepAlive>
```

### 自定义模式

```ts
useKeepAlive({
  name: 'UserList',
  mode: 'custom',
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
      <td>options</td>
      <td>UseKeepAliveOptions</td>
      <td>缓存配置；传入 number 时表示更新 includes 的延迟时间</td>
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
      <td>name</td>
      <td>需要缓存的组件名称，Route name 和 Component name 需要保持一致</td>
    </tr>
    <tr>
      <td>mode</td>
      <td>缓存模式，auto 自动管理，custom 手动管理</td>
    </tr>
    <tr>
      <td>relations</td>
      <td>关联路由名称列表，用于子路由缓存判断</td>
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
  </tbody>
</table>
