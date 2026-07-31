<template>
  <div class="vro-van-select-picker">
    <span>vro-van-select-picker</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanSelectPickerProps } from './types'

  defineOptions({ name: 'VroVanSelectPicker' })

  defineProps(vroVanSelectPickerProps)
</script>
