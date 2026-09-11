# useCountDown

### 介绍

用于管理倒计时状态，常见于验证码发送后的等待时间。

## 代码演示

### 基础用法

```ts
import { useCountDown } from '@vrojs/use'

const [count, trigger] = useCountDown(60)

trigger()
```

### 自定义起始值

调用 `trigger` 时可以传入新的起始秒数覆盖默认值。

```ts
trigger(10)
```

### 监听倒计时

通过 `onChange` 监听每次倒计时变化，通过 `onFinish` 监听倒计时结束。

```ts
const [count, trigger] = useCountDown(60, {
  onChange(count) {
    console.log('当前倒计时:', count)
  },
  onFinish() {
    console.log('倒计时结束')
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
      <td>start</td>
      <td>number</td>
      <td>默认倒计时秒数，默认 60</td>
    </tr>
    <tr>
      <td>options</td>
      <td>UseCountDownOptions</td>
      <td>配置项</td>
    </tr>
  </tbody>
</table>

### UseCountDownOptions

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>(count: number) => void</td>
      <td>每次倒计时值变化时触发，包括初始值和最终的 0</td>
    </tr>
    <tr>
      <td>onFinish</td>
      <td>() => void</td>
      <td>倒计时结束时触发</td>
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
      <td>count</td>
      <td>当前剩余秒数</td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>开始倒计时，可传入新的起始秒数</td>
    </tr>
  </tbody>
</table>
