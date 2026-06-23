<template>
  <demo-block title="基础用法">
    <ul>
      <li>count：{{ count }}</li>
      <li class="demo-actions">
        <button @click="setCount((value) => value + 1)">增加</button>
        <button @click="setCount(0)">重置</button>
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useState } from '@vrojs/use'

  const [count, setCount] = useState(0)
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }
</style>
