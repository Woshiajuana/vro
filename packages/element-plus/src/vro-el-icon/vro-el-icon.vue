<template>
  <div class="vro-el-icon">
    <span>vro-el-icon</span>
  </div>
</template>

<script setup lang="ts">
  import { vroElIconProps } from './types'

  defineOptions({ name: 'VroElIcon' })

  defineProps(vroElIconProps)
</script>
