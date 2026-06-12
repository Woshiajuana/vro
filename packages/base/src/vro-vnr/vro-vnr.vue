<template>
  <component v-for="(vn, index) in nodes" :is="vn" :key="vn.key ?? index" />
</template>

<script setup lang="ts">
  import { vroVnrProps } from './types'

  defineOptions({ name: 'VroVnr' })

  defineProps(vroVnrProps)
</script>
