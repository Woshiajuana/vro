<template>
  <div class="vro-van-cell-group">
    <div v-if="title || $slots.title" class="vro-van-cell-group-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="vro-van-cell-group-content"
      :class="{
        'is-inset': inset,
        'is-border': border,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { vroVanCellGroupProps, type VroVanCellGroupSlots } from './types'

  defineOptions({ name: 'VroVanCellGroup' })
  defineSlots<VroVanCellGroupSlots>()
  defineProps(vroVanCellGroupProps)
</script>
