<template>
  <van-popup class="vro-van-date-time-picker">
    <VanPicker>vro-van-date-time-picker</VanPicker>
  </van-popup>
</template>

<script setup lang="ts">
  import { Picker as VanPicker, pickerProps as vanPickerProps, Popup as VanPopup } from 'vant'

  import { vroVanDateTimePickerProps } from './types'

  defineOptions({ name: 'VroVanDateTimePicker' })

  defineProps(vroVanDateTimePickerProps)
</script>
