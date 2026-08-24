<template>
  <div class="vro-van-plate-input">
    <span>vro-van-plate-input</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanPlateInputProps } from './types'

  defineOptions({ name: 'VroVanPlateInput' })

  defineProps(vroVanPlateInputProps)
</script>
