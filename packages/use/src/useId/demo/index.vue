<template>
  <demo-block title="基础用法">
    <div>{{ id }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { useId } from '@vrojs/use'

  const id = useId()
</script>
