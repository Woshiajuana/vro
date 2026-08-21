# VroVanPickerToolbar

### 介绍

用于选择器类弹层的顶部操作栏，提供取消按钮、标题和确认按钮。

## 代码演示

### 基础用法

```html
<vro-van-picker-toolbar title="请选择" @cancel="onCancel" @confirm="onConfirm" />
```

### 自定义按钮文案

```html
<vro-van-picker-toolbar title="选择城市" cancel-text="返回" confirm-text="完成" />
```

### 隐藏按钮

```html
<vro-van-picker-toolbar title="只显示确认" :show-cancel-button="false" />
<vro-van-picker-toolbar title="只显示取消" :show-confirm-button="false" />
```

### 自定义内容

```html
<vro-van-picker-toolbar>
  <template #cancel>关闭</template>
  <template #title>自定义标题</template>
  <template #confirm>保存</template>
</vro-van-picker-toolbar>
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
    <tr v-for="(item, key) in vroVanPickerToolbarProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

### 事件 Events

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>参数</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>-</td>
      <td>点击取消按钮时触发</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>-</td>
      <td>点击确认按钮时触发</td>
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
      <td>cancel</td>
      <td>自定义取消按钮内容</td>
    </tr>
    <tr>
      <td>title</td>
      <td>自定义标题内容</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>自定义确认按钮内容</td>
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
      <td>--vro-van-picker-toolbar-height</td>
      <td>44px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-toolbar-action-padding</td>
      <td>0 16px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-toolbar-action-min-width</td>
      <td>64px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-toolbar-action-font-size</td>
      <td>14px</td>
    </tr>
    <tr>
      <td>--vro-van-picker-toolbar-title-font-size</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanPickerToolbar, vroVanPickerToolbarProps } from '.'
  import { parseType } from '../utils'
</script>
