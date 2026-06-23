<template>
  <demo-block title="基础用法">
    <button :disabled="count > 0" @click="trigger()">
      {{ count > 0 ? `${count} s` : '获取验证码' }}
    </button>
  </demo-block>
</template>

<script setup lang="ts">
  import { useCountDown } from '@vrojs/use'

  const [count, trigger] = useCountDown(10)
</script>
