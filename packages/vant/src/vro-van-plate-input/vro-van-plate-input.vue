<template>
  <VroVanCell class="vro-van-plate-input">
    <span>vro-van-plate-input</span>
  </VroVanCell>
</template>

<script setup lang="ts">
  import { VroVanCell } from '../vro-van-cell'
  import { vroVanPlateInputProps } from './types'

  defineOptions({ name: 'VroVanPlateInput' })

  defineProps(vroVanPlateInputProps)
</script>
