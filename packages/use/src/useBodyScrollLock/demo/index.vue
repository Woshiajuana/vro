<template>
  <demo-block title="基础用法">
    <ul>
      <li>状态：{{ locked ? '已锁定' : '未锁定' }}</li>
      <li class="demo-actions">
        <button @click="toggle()">切换</button>
        <button @click="lock">锁定</button>
        <button @click="unlock">解锁</button>
      </li>
    </ul>
    <div class="demo-content">
      <p v-for="item in 12" :key="item">滚动内容 {{ item }}</p>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { useBodyScrollLock } from '@vrojs/use'

  const { locked, lock, unlock, toggle } = useBodyScrollLock()
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }

  .demo-content {
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #eee;
  }
</style>
