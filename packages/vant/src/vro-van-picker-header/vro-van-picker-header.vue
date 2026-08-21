<template>
  <div class="vro-van-picker-header">
    <button
      v-if="showCancelButton"
      class="vro-van-picker-header-button is-cancel"
      @click="$emit('cancel')"
    >
      {{ cancelText || '取消' }}
    </button>
    <span class="vro-van-picker-header-title">{{ title }}</span>
    <button
      v-if="showConfirmButton"
      class="vro-van-picker-header-button is-confirm"
      @click="$emit('confirm')"
    >
      {{ confirmText || '确认' }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { vroVanPickerHeaderProps } from './types'

  defineOptions({ name: 'VroVanPickerHeader' })

  defineProps(vroVanPickerHeaderProps)
</script>
