<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-keyboard"
    :show="visible"
    @click-overlay="hide('cancel')"
    @click-close-icon="hide('cancel')"
    @closed="$emit('closed')"
  >
    <vro-van-picker-toolbar
      :cancel-text="computedProps.cancelText"
      :confirm-text="computedProps.confirmText"
      :title="computedProps.title || t('keyboard.title')"
      @cancel="hide('cancel')"
      @confirm="handleConfirm"
    />

    <div class="vro-van-keyboard-display">
      <span class="vro-van-keyboard-display-value" :class="{ 'is-placeholder': !currentValue }">
        {{ currentValue || computedProps.placeholder || t('keyboard.placeholder') }}
      </span>
      <button
        v-if="computedProps.onPaste"
        class="vro-van-keyboard-display-copy"
        type="button"
        @click="handlePaste"
      >
        {{ t('keyboard.pasteText') }}
      </button>
    </div>

    <ul class="vro-van-keyboard-content">
      <li
        v-for="(row, rowIndex) in VRO_VAN_KEYBOARD_KEYS"
        :key="rowIndex"
        class="vro-van-keyboard-row"
      >
        <button
          v-for="key in row"
          :key="key"
          class="vro-van-keyboard-key"
          :class="{
            'is-delete': key === VRO_VAN_KEYBOARD_DELETE_KEY,
            'is-sure': key === VRO_VAN_KEYBOARD_SURE_KEY,
          }"
          type="button"
          :disabled="isDisabledKey(key)"
          @click="handleKeyClick(key)"
        >
          {{ getKeyText(key) }}
        </button>
      </li>
    </ul>
  </van-popup>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { Popup as VanPopup } from 'vant'
  import { computed, ref } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanPickerToolbar } from '../vro-van-picker-toolbar'
  import {
    VRO_VAN_KEYBOARD_DELETE_KEY,
    VRO_VAN_KEYBOARD_KEYS,
    VRO_VAN_KEYBOARD_SURE_KEY,
  } from './config'
  import {
    type VroVanKeyboardEmits,
    type VroVanKeyboardProps,
    vroVanKeyboardProps,
    type VroVanKeyboardResult,
  } from './types'

  defineOptions({ name: 'VroVanKeyboard' })

  defineEmits<VroVanKeyboardEmits>()
  const props = defineProps(vroVanKeyboardProps)

  const { t } = useLocale()

  const currentValue = ref('')
  const dynamicProps = ref<Partial<VroVanKeyboardProps>>()

  const computedProps = computed<VroVanKeyboardProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const { visible, show, hide, confirm } = useVisible<
    Partial<VroVanKeyboardProps>,
    VroVanKeyboardResult
  >({
    showCallback: (options) => {
      dynamicProps.value = options
      currentValue.value = options?.value ?? props.value ?? ''
    },
    confirmCallback: (value: string) => {
      return { value }
    },
  })

  const maxLength = computed(() => Number(computedProps.value.maxlength) || Infinity)

  const isDisabledKey = (key: string) => {
    return computedProps.value.disabledKeys.includes(key)
  }

  const getKeyText = (key: string) => {
    if (key === VRO_VAN_KEYBOARD_DELETE_KEY) {
      return t('keyboard.deleteText')
    }

    if (key === VRO_VAN_KEYBOARD_SURE_KEY) {
      return t('keyboard.sureText')
    }

    return key
  }

  const appendValue = (value: string) => {
    currentValue.value = `${currentValue.value}${value}`.slice(0, maxLength.value)
  }

  const handleKeyClick = (key: string) => {
    if (key === VRO_VAN_KEYBOARD_DELETE_KEY) {
      currentValue.value = currentValue.value.slice(0, -1)
      return
    }

    if (key === VRO_VAN_KEYBOARD_SURE_KEY) {
      handleConfirm()
      return
    }

    appendValue(key)
  }

  const handlePaste = async () => {
    appendValue((await computedProps.value.onPaste?.()) || '')
  }

  const handleConfirm = () => {
    confirm(currentValue.value)
  }

  defineExpose({
    visible,
    show,
    hide,
    confirm: handleConfirm,
  })
</script>
