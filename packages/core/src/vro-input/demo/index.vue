<template>
  <demo-block title="基础用法1">
    <vro-input v-model="value" />
    <p>值：{{ value }}</p>
  </demo-block>
</template>

<script setup lang="ts">
  import { VroInput } from '@vrojs/core'
  import { ref } from 'vue'

  const value = ref('')
</script>
