<template>
  <input v-bind="props" />
</template>

<script setup lang="ts">
  import { vroInputProps } from './types'

  const props = defineProps(vroInputProps)
</script>
