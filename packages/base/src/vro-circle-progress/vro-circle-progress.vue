<template>
  <div class="vro-circle-progress">
    <span>vro-circle-progress</span>
  </div>
</template>

<script setup lang="ts">
  import { vroCircleProgressProps } from './types'

  defineOptions({ name: 'VroCircleProgress' })

  defineProps(vroCircleProgressProps)
</script>
