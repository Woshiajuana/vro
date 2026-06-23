<template>
  <demo-block title="基础用法">
    <pre>{{ params }}</pre>
  </demo-block>
</template>

<script setup lang="ts">
  import { useParams } from '@vrojs/use'

  const params = useParams<Record<string, string>>()
</script>
