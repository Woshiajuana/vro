<template>
  <van-popup class="vro-van-picker">
    <van-picker></van-picker>
    <input :placeholder="t('picker.filterPlaceholder')" class="hor-picker-filter" type="text" />
  </van-popup>
</template>

<script setup lang="ts">
  import { Picker as VanPicker, Popup as VanPopup } from 'vant'

  import { useLocale } from '../locale'
  import { vroVanPickerProps } from './types'

  defineOptions({ name: 'VroVanPicker' })

  defineProps(vroVanPickerProps)

  const { t } = useLocale()
</script>
