<template>
  <div class="vro-van-field">
    <span>vro-van-field</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanFieldProps } from './types'

  defineOptions({ name: 'VroVanField' })

  defineProps(vroVanFieldProps)
</script>
