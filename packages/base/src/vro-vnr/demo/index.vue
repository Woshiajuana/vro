<template>
  <demo-block title="基础用法">
    <vro-vnr :nodes="nodes" />
  </demo-block>
</template>

<script setup lang="ts">
  import { h } from 'vue'

  const nodes = [
    h('p', '由 VNode 渲染的文本'),
    h(
      'button',
      {
        type: 'button',
        onClick: () => console.log('click vnode button'),
      },
      'VNode 按钮',
    ),
  ]
</script>
