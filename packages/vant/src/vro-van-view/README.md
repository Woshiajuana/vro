# VroVanView

### 介绍

移动端页面容器，默认包含 `VroVanNavbar`、内容区和底部区域，适合承载单页视图结构。

## 代码演示

### 基础用法

通过 `title` 设置导航栏标题。

```html
<vro-van-view title="页面标题">
  <div>
    <p>页面内容 1</p>
    <p>页面内容 2</p>
  </div>
</vro-van-view>
```

### 导航栏属性

通过 `navbarProps` 透传 `VroVanNavbar` 支持的其它属性。

```html
<vro-van-view
  title="详情页"
  :navbar-props="{
    leftText: '返回',
    rightText: '保存',
  }"
  @click-left="onClickLeft"
  @click-right="onClickRight"
>
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
<vro-van-view @click-left="onClickLeft" @click-right="onClickRight">
  <template #left>取消</template>
  <template #title>编辑资料</template>
  <template #right>保存</template>

  <div>页面内容</div>
</vro-van-view>
```

### 自定义导航栏内容

通过 `navbar` 插槽可以覆盖默认导航栏标题区域。

```html
<vro-van-view>
  <template #navbar>
    <div>消息 12</div>
  </template>

  <div>页面内容</div>
</vro-van-view>
```

### 自定义头部和底部

```html
<vro-van-view>
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
<vro-van-view title="固定内容" :scrollable="false">
  <div>
    <p>页面内容 1</p>
    <p>页面内容 2</p>
  </div>
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
