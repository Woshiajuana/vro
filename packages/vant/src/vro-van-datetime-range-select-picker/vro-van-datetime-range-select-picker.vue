<template>
  <vro-van-trigger-cell class="vro-van-datetime-range-select-picker">
    <span class="vro-van-datetime-range-select-picker-value"> 2012-12-12 </span>
    <span class="vro-van-datetime-range-select-picker-connecter">至</span>
    <span class="vro-van-datetime-range-select-picker-value"> 2012-12-12 </span>
  </vro-van-trigger-cell>
</template>

<script setup lang="ts">
  import { VroVanTriggerCell } from '../vro-van-trigger-cell'
  import { vroVanDatetimeRangeSelectPickerProps } from './types'

  defineOptions({ name: 'VroVanDatetimeRangeSelectPicker' })

  defineProps(vroVanDatetimeRangeSelectPickerProps)
</script>
