<template>
  <div class="vro-van-picker-toolbar">
    <button
      v-if="showCancelButton"
      class="vro-van-picker-toolbar-button is-cancel"
      type="button"
      @click="$emit('cancel')"
    >
      <slot name="cancel">
        {{ cancelText || t('pickerToolbar.cancelText') }}
      </slot>
    </button>
    <span class="vro-van-picker-toolbar-title">
      <slot name="title">
        {{ title }}
      </slot>
    </span>
    <button
      v-if="showConfirmButton"
      class="vro-van-picker-toolbar-button is-confirm"
      type="button"
      @click="$emit('confirm')"
    >
      <slot name="confirm">
        {{ confirmText || t('pickerToolbar.confirmText') }}
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useLocale } from '../locale'
  import {
    type VroVanPickerToolbarEmits,
    vroVanPickerToolbarProps,
    type VroVanPickerToolbarSlots,
  } from './types'

  defineOptions({ name: 'VroVanPickerToolbar' })

  defineSlots<VroVanPickerToolbarSlots>()
  defineEmits<VroVanPickerToolbarEmits>()
  defineProps(vroVanPickerToolbarProps)

  const { t } = useLocale()
</script>
