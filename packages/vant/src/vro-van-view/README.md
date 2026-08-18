# VroVanView

### 介绍

移动端页面容器，默认包含 `VroVanNavbar`、内容区和底部区域，适合承载单页视图结构。

## 代码演示

### 基础用法

```html
<vro-van-view :navbar-props="{ title: '页面标题' }">
  <div>页面内容</div>
</vro-van-view>
```

### 隐藏导航栏

```html
<vro-van-view :show-navbar="false">
  <div>页面内容</div>
</vro-van-view>
```

### 自定义导航栏插槽

```html
<vro-van-view :navbar-props="{ rightText: '保存' }" @click-right="onClickRight">
  <template #title>编辑资料</template>
  <div>页面内容</div>
</vro-van-view>
```

### 自定义头部和底部

```html
<vro-van-view safe-area-inset-bottom>
  <template #header>
    <div>自定义头部</div>
  </template>

  <div>页面内容</div>

  <template #footer>
    <div>底部操作区</div>
  </template>
</vro-van-view>
```

### 禁止内容滚动

```html
<vro-van-view :navbar-props="{ title: '固定内容' }" :scrollable="false">
  <div>页面内容</div>
</vro-van-view>
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
    <tr v-for="(item, key) in vroVanViewProps" :key="key">
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
      <td>default</td>
      <td>页面主要内容</td>
    </tr>
    <tr>
      <td>header</td>
      <td>自定义页面头部，会覆盖默认导航栏</td>
    </tr>
    <tr>
      <td>navbar</td>
      <td>自定义导航栏主体内容，会转发给 VroVanNavbar</td>
    </tr>
    <tr>
      <td>title</td>
      <td>自定义导航栏标题内容，会转发给 VroVanNavbar</td>
    </tr>
    <tr>
      <td>left</td>
      <td>自定义导航栏左侧内容，会转发给 VroVanNavbar</td>
    </tr>
    <tr>
      <td>right</td>
      <td>自定义导航栏右侧内容，会转发给 VroVanNavbar</td>
    </tr>
    <tr>
      <td>footer</td>
      <td>页面底部内容</td>
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
      <td>点击默认导航栏左侧区域时触发</td>
      <td>event: MouseEvent</td>
    </tr>
    <tr>
      <td>click-right</td>
      <td>点击默认导航栏右侧区域时触发</td>
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
      <td>--vro-van-view-background</td>
      <td>var(--van-background)</td>
    </tr>
    <tr>
      <td>--vro-van-view-content-padding</td>
      <td>0</td>
    </tr>
    <tr>
      <td>--vro-van-view-footer-background</td>
      <td>var(--van-background-2)</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanView, vroVanViewProps } from '.'
  import { parseType } from '../utils'
</script>
