<template>
  <demo-block title="基础用法">
    <div class="demo-icons">
      <vro-el-icon :name="Search" />
      <vro-el-icon :name="Edit" />
      <vro-el-icon name="icon-search" />
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { Edit, Search } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
  .demo-icons {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 24px;
  }
</style>
