<template>
  <demo-block title="基础用法">
    <ul>
      <li>当前动画：{{ name || '-' }}</li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useTransitionName } from '@vrojs/use'

  const name = useTransitionName({
    enterClass: 'slide-left',
    leaveClass: 'slide-right',
  })
</script>
