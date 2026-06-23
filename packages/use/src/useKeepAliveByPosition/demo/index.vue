<template>
  <demo-block title="基础用法">
    <ul>
      <li>includes：{{ includes.join(', ') || '-' }}</li>
      <li>缓存数量：{{ keepAliveList?.length ?? 0 }}</li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useKeepAliveByPosition } from '@vrojs/use'

  const { keepAliveList, includes } = useKeepAliveByPosition({
    name: 'UseKeepAliveByPositionDemo',
    mode: 'custom',
  })
</script>
