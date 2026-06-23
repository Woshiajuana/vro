<template>
  <demo-block title="基础用法">
    <pre>{{ query }}</pre>
  </demo-block>
</template>

<script setup lang="ts">
  import { useQuery } from '@vrojs/use'

  const query = useQuery<Record<string, string>>()
</script>
