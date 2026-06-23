# useKeepPosition

### 介绍

用于保存并恢复滚动位置，适合配合 KeepAlive 处理长列表页面返回后的滚动恢复。

## 代码演示

### 基础用法

```ts
import { useKeepPosition } from '@vrojs/use'

const { keep, restore } = useKeepPosition({
  selectors: '.list',
})
```

### 自定义目标

```ts
const { keep, restore } = useKeepPosition({
  getTarget: () => document.documentElement,
})
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
      <td>selectors</td>
      <td>滚动容器选择器，默认 document.documentElement</td>
    </tr>
    <tr>
      <td>getTarget</td>
      <td>自定义获取滚动容器的方法</td>
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
      <td>keep</td>
      <td>保存当前滚动位置</td>
    </tr>
    <tr>
      <td>restore</td>
      <td>恢复已保存的滚动位置</td>
    </tr>
  </tbody>
</table>
