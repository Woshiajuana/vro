<template>
  <div class="vro-input">
    <span>vro-input</span>
  </div>
</template>

<script setup lang="ts">
  import { vroInputProps } from './types'

  // 如果定义属性 这里传 vroInputProps， 在 types 里完善类型
  defineProps(vroInputProps)
</script>
