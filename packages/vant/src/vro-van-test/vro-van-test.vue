<template>
  <div class="vro-van-test">
    <span>vro-van-test</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanTestProps } from './types'

  defineOptions({ name: 'VroVanTest' })

  defineProps(vroVanTestProps)
</script>
