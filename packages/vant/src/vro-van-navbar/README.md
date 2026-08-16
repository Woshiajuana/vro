# VroVanNavbar

### 介绍

移动端顶部导航栏，用于展示页面标题、返回入口和右侧操作。

## 代码演示

### 基础用法

```html
<vro-van-navbar title="标题" @click-left="onClickLeft" />
```

### 左右文本

```html
<vro-van-navbar
  title="订单详情"
  left-text="返回"
  right-text="更多"
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

### 自定义内容

```html
<vro-van-navbar title="消息">
  <template #left>关闭</template>
  <template #right>保存</template>
</vro-van-navbar>
```

### 无返回箭头

```html
<vro-van-navbar title="个人中心" :left-arrow="false" right-text="设置" />
```

### 固定在顶部

```html
<vro-van-navbar title="固定导航" fixed placeholder safe-area-inset-top />
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
    <tr v-for="(item, key) in vroVanNavbarProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 插槽 Slots

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>title</td>
      <td>自定义标题内容</td>
    </tr>
    <tr>
      <td>left</td>
      <td>自定义左侧内容</td>
    </tr>
    <tr>
      <td>right</td>
      <td>自定义右侧内容</td>
    </tr>
  </tbody>
</table>

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>click-left</td>
      <td>点击左侧区域时触发</td>
      <td>event: MouseEvent</td>
    </tr>
    <tr>
      <td>click-right</td>
      <td>点击右侧区域时触发</td>
      <td>event: MouseEvent</td>
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
      <td>--vro-van-navbar-height</td>
      <td>46px</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-padding-x</td>
      <td>16px</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-background</td>
      <td>var(--van-background-2)</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-title-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-title-font-size</td>
      <td>var(--van-font-size-lg)</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-title-font-weight</td>
      <td>var(--van-font-bold)</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-text-color</td>
      <td>var(--van-primary-color)</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-icon-size</td>
      <td>18px</td>
    </tr>
    <tr>
      <td>--vro-van-navbar-border-color</td>
      <td>var(--van-border-color)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanNavbar, vroVanNavbarProps } from '.'
  import { parseType } from '../utils'
</script>
