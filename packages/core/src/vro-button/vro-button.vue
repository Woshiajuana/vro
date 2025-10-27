<template>
  <div class="vro-button">
    <span>vro-button</span>
  </div>
</template>

<script setup lang="ts">
  import { vroButtonProps } from './types'

  // 如果定义属性 这里传 vroButtonProps， 在 types 里完善类型
  defineProps(vroButtonProps)
</script>
