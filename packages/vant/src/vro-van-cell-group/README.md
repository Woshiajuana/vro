# VroVanCellGroup

### 介绍

用于将多个 Cell 组织成一个分组，支持标题、卡片风格和自定义标题内容。

## 代码演示

### 基础用法

```html
<vro-van-cell-group>
  <vro-van-cell label="单元格" value="内容" />
  <vro-van-cell label="带箭头" value="内容" arrow />
</vro-van-cell-group>
```

### 分组标题

```html
<vro-van-cell-group title="基础信息">
  <vro-van-cell label="姓名" value="张三" />
  <vro-van-cell label="手机号" value="13800138000" />
</vro-van-cell-group>
```

### 卡片风格

```html
<vro-van-cell-group inset title="账户信息">
  <vro-van-cell label="余额" value="¥ 8,888.00" />
  <vro-van-cell label="账单" value="查看" arrow />
</vro-van-cell-group>
```

### 使用插槽

```html
<vro-van-cell-group>
  <template #title>
    <span>自定义标题</span>
  </template>
  <vro-van-cell label="通知" value="已开启" />
  <vro-van-cell label="隐私" value="设置" arrow />
</vro-van-cell-group>
```

## API

### 属性 Props

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanCellGroupProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 事件 Events

暂无。

### 插槽 Slots

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>default</td>
      <td>自定义分组内容</td>
    </tr>
    <tr>
      <td>title</td>
      <td>自定义分组标题</td>
    </tr>
  </tbody>
</table>

### CSS 变量

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-background</td>
      <td>var(--van-background-2)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-title-color</td>
      <td>var(--van-text-color-2)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-title-font-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-title-line-height</td>
      <td>16px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-title-padding</td>
      <td>16px 16px 8px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-inset-margin</td>
      <td>0 16px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-inset-radius</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
    <tr>
      <td>--vro-van-cell-group-cell-border-offset</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

### 实例方法

暂无。

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanCellGroup, vroVanCellGroupProps } from '.'
  import { parseType } from '../utils'
</script>
