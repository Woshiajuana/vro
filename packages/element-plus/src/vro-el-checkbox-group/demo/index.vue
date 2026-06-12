<template>
  <demo-block title="基础用法">
    <vro-el-checkbox-group v-model="value" :options="options" />
    <div class="demo-value">当前值：{{ value.join('、') || '-' }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['apple'])
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange', props: { disabled: true } },
  ]
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
