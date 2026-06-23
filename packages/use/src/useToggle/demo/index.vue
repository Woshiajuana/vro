<template>
  <demo-block title="基础用法">
    <ul>
      <li>状态：{{ visible ? '开启' : '关闭' }}</li>
      <li class="demo-actions">
        <button @click="toggle()">切换</button>
        <button @click="toggle(true)">开启</button>
        <button @click="toggle(false)">关闭</button>
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useToggle } from '@vrojs/use'

  const [visible, toggle] = useToggle()
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }
</style>
