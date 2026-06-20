<template>
  <demo-block title="基础用法">
    <vro-el-tree
      v-model="value"
      show-checkbox
      node-key="id"
      default-expand-all
      :options="options"
      :props="{ label: 'label' }"
    />
    <div class="demo-value">当前值：{{ value.join('、') || '-' }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['system'])
  const options = [
    {
      id: 'system',
      parentId: '-1',
      label: '系统管理',
      children: [
        { id: 'user', parentId: 'system', label: '用户管理' },
        { id: 'role', parentId: 'system', label: '角色管理' },
      ],
    },
    {
      id: 'content',
      parentId: '-1',
      label: '内容管理',
      children: [
        { id: 'article', parentId: 'content', label: '文章管理' },
        { id: 'comment', parentId: 'content', label: '评论管理' },
      ],
    },
  ]
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
