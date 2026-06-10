# VroVanTest


### 介绍

...


## 代码演示


### 基础用法


## API

### 属性 Props

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>类型</td>
      <td>默认值</td>
    </tr>
    <tr v-for="(item, key) in vroVanTestProps" :key="key">
      <td>{{ key }}</td>
      <td>{{ parseType(item.type || item) }}</td>
      <td>{{ reserve(item.default, '-') }}</td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr>
      <td>名称</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>xx</td>
      <td>xxx</td>
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
      <td>xx</td>
      <td>xxx</td>
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
      <td>xx</td>
      <td>xxx</td>
    </tr>
  </tbody>
</table>



<script setup lang="ts">
  import { reserve } from '@daysnap/utils'
  import { VroVanTest, vroVanTestProps } from '.'
  import { parseType } from '../utils'
</script>
