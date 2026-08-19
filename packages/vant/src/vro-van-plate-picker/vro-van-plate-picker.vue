<template>
  <div class="vro-van-plate-picker">
    <span>vro-van-plate-picker</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanPlatePickerProps } from './types'

  defineOptions({ name: 'VroVanPlatePicker' })

  defineProps(vroVanPlatePickerProps)
</script>
