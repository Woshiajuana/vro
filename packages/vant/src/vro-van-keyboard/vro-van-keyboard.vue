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
      :title="computedProps.title"
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
        <svg class="vro-van-keyboard-paste-icon" viewBox="0 0 24 24">
          <path
            d="M9 3h6a2 2 0 0 1 2 2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2zm0 2v2h6V5H9zM6 7v12h12V7h-1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2H6zm3 5h6v2H9v-2zm0 4h5v2H9v-2z"
            fill="currentColor"
          ></path>
        </svg>
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
            'is-hide': key === VRO_VAN_KEYBOARD_HIDE_KEY,
            'is-delete': key === VRO_VAN_KEYBOARD_DELETE_KEY,
          }"
          type="button"
          :disabled="isDisabledKey(key)"
          @click="handleKeyClick(key)"
        >
          <svg
            v-if="key === VRO_VAN_KEYBOARD_HIDE_KEY"
            class="vro-van-keyboard-icon vro-van-keyboard-hide-icon"
            viewBox="0 0 30 24"
          >
            <path
              d="M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            v-else-if="key === VRO_VAN_KEYBOARD_DELETE_KEY"
            class="vro-van-keyboard-icon vro-van-keyboard-delete-icon"
            viewBox="0 0 32 22"
          >
            <path
              d="M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z"
              fill="currentColor"
            ></path>
          </svg>
          <template v-else>{{ key }}</template>
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
    VRO_VAN_KEYBOARD_HIDE_KEY,
    VRO_VAN_KEYBOARD_KEYS,
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

  const inputKeys = new Set(
    VRO_VAN_KEYBOARD_KEYS.flat().filter(
      (key) => key !== VRO_VAN_KEYBOARD_HIDE_KEY && key !== VRO_VAN_KEYBOARD_DELETE_KEY,
    ),
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

  const maxLength = computed(() => {
    const { maxlength } = computedProps.value

    if (maxlength === undefined || maxlength === null || maxlength === '') {
      return Infinity
    }

    const value = Math.floor(Number(maxlength))

    return Number.isFinite(value) ? Math.max(value, 0) : Infinity
  })

  const isDisabledKey = (key: string) => {
    return computedProps.value.disabledKeys.includes(key)
  }

  const appendValue = (value: string) => {
    currentValue.value = `${currentValue.value}${value}`.slice(0, maxLength.value)
  }

  const normalizeValue = (value: string) => {
    return Array.from(value.toUpperCase())
      .filter((key) => inputKeys.has(key))
      .join('')
  }

  const handleKeyClick = (key: string) => {
    if (key === VRO_VAN_KEYBOARD_HIDE_KEY) {
      hide('cancel')
      return
    }

    if (key === VRO_VAN_KEYBOARD_DELETE_KEY) {
      currentValue.value = currentValue.value.slice(0, -1)
      return
    }

    appendValue(key)
  }

  const handlePaste = async () => {
    try {
      appendValue(normalizeValue((await computedProps.value.onPaste?.()) || ''))
    } catch {}
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
