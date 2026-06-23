# useEventListener

### 介绍

用于在组件生命周期内管理事件监听。组件 `mounted`、`activated` 时绑定事件，`unmounted`、`deactivated` 时解绑事件。

## 代码演示

### 基础用法

```ts
import { useEventListener } from '@vrojs/use'

useEventListener('resize', () => {
  console.log(window.innerWidth)
})
```

### 指定目标元素

```ts
const target = ref<HTMLElement>()

useEventListener('click', handleClick, {
  target,
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
      <td>type</td>
      <td>string</td>
      <td>事件名称</td>
    </tr>
    <tr>
      <td>listener</td>
      <td>EventListener</td>
      <td>事件回调</td>
    </tr>
    <tr>
      <td>options</td>
      <td>UseEventListenerOptions</td>
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
      <td>target</td>
      <td>监听目标，默认 window，支持 ref 和组件实例</td>
    </tr>
    <tr>
      <td>capture</td>
      <td>是否在捕获阶段触发，默认 false</td>
    </tr>
    <tr>
      <td>passive</td>
      <td>是否使用 passive listener，默认 false</td>
    </tr>
  </tbody>
</table>
