<template>
  <div class="vro-el-test">
    <span>vro-el-test</span>
  </div>
</template>

<script setup lang="ts">
  import { vroElTestProps } from './types'

  defineOptions({ name: 'VroElTest' })

  defineProps(vroElTestProps)
</script>
