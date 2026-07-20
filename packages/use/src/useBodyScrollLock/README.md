# useBodyScrollLock

### 介绍

用于锁定 body 滚动，常用于弹窗、抽屉、全屏遮罩等场景。支持多个组件同时锁定，只有所有锁都释放后才会恢复 body 原始滚动状态。

## 代码演示

### 基础用法

```ts
import { useBodyScrollLock } from '@vrojs/use'

const { locked, lock, unlock, toggle } = useBodyScrollLock()

lock()
unlock()
toggle()
```

### 响应式控制

```ts
import { ref } from 'vue'
import { useBodyScrollLock } from '@vrojs/use'

const visible = ref(false)

useBodyScrollLock(visible)
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
      <td>initialLocked</td>
      <td>boolean | Ref&lt;boolean&gt;</td>
      <td>初始锁定状态，或外部响应式布尔值，默认 false</td>
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
      <td>locked</td>
      <td>当前锁定状态</td>
    </tr>
    <tr>
      <td>lock</td>
      <td>锁定 body 滚动</td>
    </tr>
    <tr>
      <td>unlock</td>
      <td>解锁 body 滚动</td>
    </tr>
    <tr>
      <td>toggle</td>
      <td>切换锁定状态，也可以传入指定状态</td>
    </tr>
  </tbody>
</table>
