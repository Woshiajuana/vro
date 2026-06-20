<template>
  <demo-block title="基础用法">
    <vro-el-tags v-model="value" />
    <div class="demo-value">当前值：{{ value.join('、') || '-' }}</div>
  </demo-block>

  <demo-block title="禁用状态">
    <vro-el-tags v-model="disabledValue" disabled />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['Vue', 'Element Plus'])
  const disabledValue = ref(['只读', '不可编辑'])
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
