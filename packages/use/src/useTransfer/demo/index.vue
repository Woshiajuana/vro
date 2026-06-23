<template>
  <demo-block title="基础用法">
    <ul>
      <li>执行结果：{{ message || '-' }}</li>
      <li class="demo-actions">
        <button @click="handleFn">执行函数</button>
        <button @click="handleDisabled">禁用处理</button>
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useTransfer } from '@vrojs/use'
  import { ref } from 'vue'

  const message = ref('')
  const transfer = useTransfer()

  const handleFn = () => {
    transfer({
      fn() {
        message.value = `已执行：${new Date().toLocaleTimeString()}`
      },
    })
  }

  const handleDisabled = () => {
    message.value = 'disabled 时不会执行跳转或函数'
    transfer({
      disabled: true,
      fn() {
        message.value = '这段不会执行'
      },
    })
  }
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }
</style>
