<template>
  <demo-block title="基础用法">
    <ul>
      <li>窗口宽度：{{ width }}</li>
      <li>resize 次数：{{ count }}</li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useEventListener } from '@vrojs/use'
  import { ref } from 'vue'

  const width = ref(window.innerWidth)
  const count = ref(0)

  useEventListener('resize', () => {
    width.value = window.innerWidth
    count.value += 1
  })
</script>
