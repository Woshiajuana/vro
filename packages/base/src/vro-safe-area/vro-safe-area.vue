<template>
  <div
    class="vro-safe-area"
    :class="{
      'is-top': top,
      'is-bottom': bottom,
      'is-left': left,
      'is-right': right,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { vroSafeAreaProps, type VroSafeAreaSlots } from './types'

  defineOptions({ name: 'VroSafeArea' })

  defineSlots<VroSafeAreaSlots>()
  defineProps(vroSafeAreaProps)
</script>
