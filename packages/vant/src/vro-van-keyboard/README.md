# VroVanKeyboard

### 介绍

用于输入文本、VIN、车牌字符的底部弹层键盘。支持实例方法打开、函数式调用、禁用按键、粘贴和最大长度限制。

## 代码演示

### 基础用法

```html
<vro-van-trigger-cell v-model="textValue" label="文本" placeholder="请输入" @click="openText" />
<vro-van-keyboard ref="keyboardRef" />
```

```ts
const openText = () => {
  keyboardRef.value?.show({ value: textValue.value }).then((result) => {
    textValue.value = result.value
  })
}
```

### 限制长度

```ts
keyboardRef.value?.show({
  value: vinValue.value,
  maxlength: 17,
})
```

### 禁用按键

```ts
keyboardRef.value?.show({
  value: textValue.value,
  disabledKeys: ['0', 'A'],
})
```

### 粘贴

```ts
keyboardRef.value?.show({
  value: textValue.value,
  onPaste: () => 'PASTE',
})
```

### 函数式调用

```ts
showVroVanKeyboard({
  value: textValue.value,
}).then((result) => {
  textValue.value = result.value
})
```

## API

### 属性 Props

`value` 仅作为打开弹层时的初始输入值，确认结果通过 `show` 返回的 Promise 获取。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanKeyboardProps" :key="key">
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
      <td>closed</td>
      <td>-</td>
      <td>弹层关闭动画结束时触发</td>
    </tr>
  </tbody>
</table>

### 确认结果 Result

点击确认时，`show` 返回的 Promise 会 resolve 以下结果；点击取消或关闭弹层时，Promise 会 reject。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>value</td>
      <td>string</td>
      <td>当前输入值</td>
    </tr>
  </tbody>
</table>

### 实例方法

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹层，支持动态传入配置，并返回确认结果 Promise</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>关闭弹层</td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>确认当前输入</td>
    </tr>
  </tbody>
</table>

### CSS 变量

顶部操作栏样式可参考 VroVanPickerToolbar 的 CSS 变量。

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-padding</td>
      <td>12px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-gap</td>
      <td>6px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-row-gap</td>
      <td>8px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-display-height</td>
      <td>40px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-paste-icon-size</td>
      <td>20px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-height</td>
      <td>40px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-radius</td>
      <td>6px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-background</td>
      <td>var(--van-background)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-disabled-color</td>
      <td>var(--van-text-color-3)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-key-disabled-background</td>
      <td>var(--van-gray-2)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-action-key-color</td>
      <td>var(--van-text-color)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-action-key-background</td>
      <td>var(--van-gray-3)</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-hide-icon-width</td>
      <td>22px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-hide-icon-height</td>
      <td>18px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-delete-icon-width</td>
      <td>24px</td>
    </tr>
    <tr>
      <td>--vro-van-keyboard-delete-icon-height</td>
      <td>17px</td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanKeyboard, vroVanKeyboardProps } from '.'
  import { parseType } from '../utils'
</script>
