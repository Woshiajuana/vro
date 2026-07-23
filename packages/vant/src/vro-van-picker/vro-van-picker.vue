<template>
  <van-popup class="vro-van-picker">
    <van-picker></van-picker>
    <input placeholder="输入关键词进行筛选" class="hor-picker-filter" type="text" />
  </van-popup>
</template>

<script setup lang="ts">
  import { Picker as VanPicker, Popup as VanPopup } from 'vant'

  import { vroVanPickerProps } from './types'

  defineOptions({ name: 'VroVanPicker' })

  defineProps(vroVanPickerProps)
</script>
