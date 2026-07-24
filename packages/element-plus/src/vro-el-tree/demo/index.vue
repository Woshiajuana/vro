<template>
  <demo-block title="基础用法">
    <vro-el-tree
      v-model="value"
      show-checkbox
      default-expand-all
      :options="options"
      :props="{ label: 'label' }"
    />
    <div class="demo-value">当前值：{{ value.join('、') || '-' }}</div>
  </demo-block>

  <demo-block title="自定义节点">
    <vro-el-tree
      v-model="customValue"
      show-checkbox
      default-expand-all
      :options="options"
      :props="{ label: 'label' }"
    >
      <template #default="{ node, data }">
        <span class="demo-node">
          <span>{{ node.label }}</span>
          <span v-if="data.description" class="demo-node-description">
            {{ data.description }}
          </span>
        </span>
      </template>
    </vro-el-tree>
  </demo-block>

  <demo-block title="自定义根节点">
    <vro-el-tree
      v-model="rootValue"
      show-checkbox
      default-expand-all
      root-id="root"
      :options="rootOptions"
      :props="{ label: 'label' }"
    />
    <div class="demo-value">当前值：{{ rootValue.join('、') || '-' }}</div>
  </demo-block>

  <demo-block title="空数据">
    <vro-el-tree v-model="emptyValue" show-checkbox :options="[]">
      <template #empty>暂无权限数据</template>
    </vro-el-tree>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import type { VroElTreeKey } from '../types'

  const value = ref(['system'])
  const customValue = ref(['user'])
  const rootValue = ref(['setting'])
  const emptyValue = ref<VroElTreeKey[]>([])
  const options = [
    {
      id: 'system',
      parentId: '-1',
      label: '系统管理',
      description: '后台账号和角色权限',
      children: [
        { id: 'user', parentId: 'system', label: '用户管理' },
        { id: 'role', parentId: 'system', label: '角色管理' },
      ],
    },
    {
      id: 'content',
      parentId: '-1',
      label: '内容管理',
      description: '文章、评论等内容配置',
      children: [
        { id: 'article', parentId: 'content', label: '文章管理' },
        { id: 'comment', parentId: 'content', label: '评论管理' },
      ],
    },
  ]

  const rootOptions = [
    {
      id: 'setting',
      parentId: 'root',
      label: '设置中心',
      children: [
        { id: 'profile', parentId: 'setting', label: '资料设置' },
        { id: 'security', parentId: 'setting', label: '安全设置' },
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

  .demo-node {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .demo-node-description {
    color: var(--van-doc-text-color-3);
    font-size: 12px;
  }
</style>
