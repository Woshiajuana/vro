<template>
  <VroVanTriggerCell @click="handleSelect" />
</template>

<script setup lang="ts">
  import { showVroVanPicker } from '../vro-van-picker'
  import { VroVanTriggerCell } from '../vro-van-trigger-cell'
  import { vroVanSelectPickerProps } from './types'

  defineOptions({ name: 'VroVanSelectPicker' })

  defineProps(vroVanSelectPickerProps)

  const handleSelect = async () => {
    showVroVanPicker({})
  }
</script>
