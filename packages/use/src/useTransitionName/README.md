# useTransitionName

### 介绍

配合 Vue `Transition` 使用，根据路由 history `position` 判断前进或后退动画名称。

## 代码演示

### 基础用法

```ts
import { useTransitionName } from '@vrojs/use'

const transitionName = useTransitionName({
  enterClass: 'slide-left',
  leaveClass: 'slide-right',
})
```

```vue
<Transition :name="transitionName">
  <RouterView />
</Transition>
```

## API

### 配置项 Options

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>enterClass</td>
      <td>前进时使用的动画名称</td>
    </tr>
    <tr>
      <td>leaveClass</td>
      <td>后退时使用的动画名称</td>
    </tr>
    <tr>
      <td>deep</td>
      <td>是否深度监听 route 对象</td>
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
      <td>name</td>
      <td>当前动画名称</td>
    </tr>
  </tbody>
</table>
