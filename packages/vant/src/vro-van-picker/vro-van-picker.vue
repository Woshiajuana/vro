<template>
  <van-popup class="vro-van-picker">
    <van-picker :title="computedProps.title"></van-picker>
    <input :placeholder="t('picker.filterPlaceholder')" class="hor-picker-filter" type="text" />
  </van-popup>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { Picker as VanPicker, type PickerConfirmEventParams, Popup as VanPopup } from 'vant'
  import { computed, ref } from 'vue'

  import { useLocale } from '../locale'
  import { type VroVanPickerProps, vroVanPickerProps } from './types'

  defineOptions({ name: 'VroVanPicker' })
  const props = defineProps(vroVanPickerProps)

  const dynamicProps = ref<Partial<VroVanPickerProps>>()
  const computedProps = computed<VroVanPickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const { t } = useLocale()
  const keyword = ref<string>('')

  const { show, hide, confirm, visible } = useVisible<
    Partial<VroVanPickerProps>,
    PickerConfirmEventParams & { value: any }
  >({
    showCallback: (options) => {
      keyword.value = ''
      dynamicProps.value = options
    },
    confirmCallback: (res: PickerConfirmEventParams & { value: any }) => {
      return res
    },
  })
</script>
