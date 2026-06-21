<template>
  <demo-block title="基础用法">
    <vro-el-radio-group v-model="value" :options="options" />
    <div class="demo-value">当前值：{{ value || '-' }}</div>
  </demo-block>

  <demo-block title="自定义字段名">
    <vro-el-radio-group
      v-model="customValue"
      :options="customOptions"
      label-key="name"
      value-key="id"
    />
    <div class="demo-value">当前值：{{ customValue || '-' }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('daily')
  const customValue = ref(1)
  const options = [
    { label: '每天', value: 'daily' },
    { label: '每周', value: 'weekly' },
    { label: '每月', value: 'monthly', props: { disabled: true } },
  ]
  const customOptions = [
    { name: '标准版', id: 1 },
    { name: '高级版', id: 2 },
  ]
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
