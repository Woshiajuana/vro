<template>
  <VanPopup class="vro-van-plate-picker" round position="bottom">
    <div class="vro-van-plate-picker-header">
      <button class="vro-van-plate-picker-button is-cancel">取消</button>
      <span class="vro-van-plate-picker-header-title">请选择车牌号</span>
      <button class="vro-van-plate-picker-button is-confirm">确认</button>
    </div>
    <ul class="vro-van-plate-picker-extra-keys">
      <li
        v-for="(item, index) in platePreSource"
        :key="index"
        class="vro-van-plate-picker-extra-key"
        :class="{ 'is-active': item === modelValue }"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="vro-van-plate-picker-keys">
      <li
        v-for="(item, index) in platePreSource"
        :key="index"
        class="vro-van-plate-picker-key"
        :class="{ 'is-active': item === modelValue }"
      >
        {{ item }}
      </li>
    </ul>
  </VanPopup>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { Popup as VanPopup } from 'vant'

  import { platePreSource, vroVanPlatePickerProps } from './types'

  defineOptions({ name: 'VroVanPlatePicker' })

  defineProps(vroVanPlatePickerProps)

  const { visible, show, hide, confirm } = useVisible()

  defineExpose({
    visible,
    show,
    hide,
    confirm,
  })
</script>
