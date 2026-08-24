<template>
  <van-popup class="vro-van-keyboard" round position="bottom">
    <div class="vro-van-keyboard-display">
      <span class="vro-van-keyboard-display-value">{{ placeholder || '请输入' }}</span>
      <button class="vro-van-keyboard-display-copy">粘贴</button>
    </div>
    <ul class="vro-van-keyboard-content">
      <li class="vro-van-keyboard-row">
        <div class="vro-van-keyboard-key"></div>
      </li>
    </ul>
  </van-popup>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { Popup as VanPopup } from 'vant'
  import { computed, ref } from 'vue'

  import { VroVanPickerToolbar } from '../vro-van-picker-toolbar'
  import { type VroVanKeyboardProps, vroVanKeyboardProps } from './types'

  defineOptions({ name: 'VroVanKeyboard' })

  const props = defineProps(vroVanKeyboardProps)

  const dynamicProps = ref<Partial<VroVanKeyboardProps>>()

  const computedProps = computed<VroVanKeyboardProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const { visible, show, hide, confirm } = useVisible()

  defineExpose({
    visible,
    show,
    hide,
    confirm,
  })
</script>
