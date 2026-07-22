<template>
  <div
    class="vro-van-cell"
    :class="{
      'is-row': direction === 'row',
      'is-column': direction === 'column',
      'is-required': required,
      'is-no-asterisk': noAsterisk,
      'is-arrow': arrow,
      'is-align-item-center': alignItemCenter,
      'is-ellipsis': ellipsis,
      'is-clickable': clickable,
      'is-line-clamp': lineClamp && !!+lineClamp,
    }"
    :style="{ '--vro-van-cell-line-clamp': lineClamp }"
  >
    <slot name="prepend"></slot>
    <div class="vro-van-cell-label">
      <slot name="prefix">
        <vro-van-icon
          v-if="prefixIcon"
          v-bind="resolveIcon(prefixIcon)"
          class="vro-van-cell-prefix-icon"
          @click="$emit('click-prefix-icon', $event)"
        >
          <slot name="prefix-icon-default"></slot>
        </vro-van-icon>
      </slot>
      <slot name="label">
        <span class="vro-van-cell-label-text" v-html="label"></span>
      </slot>
    </div>
    <div class="vro-van-cell-value">
      <slot>
        <span class="vro-van-cell-value-text" v-html="formatter(value)"></span>
      </slot>
      <slot name="suffix">
        <vro-van-icon
          v-if="suffixIcon"
          v-bind="resolveIcon(suffixIcon)"
          class="vro-van-cell-suffix-icon"
          @click="$emit('click-suffix-icon', $event)"
        >
          <slot name="suffix-icon-default"></slot>
        </vro-van-icon>
      </slot>
      <vro-van-icon v-if="arrow" class="vro-van-cell-arrow" name="van-icon-arrow" />
    </div>
    <slot name="append"></slot>
  </div>
</template>

<script setup lang="ts">
  import { VroVanIcon } from '../vro-van-icon'
  import {
    type VroVanCellEmits,
    type VroVanCellIcon,
    vroVanCellProps,
    type VroVanCellSlots,
  } from './types'

  defineOptions({ name: 'VroVanCell' })
  defineSlots<VroVanCellSlots>()
  defineEmits<VroVanCellEmits>()
  defineProps(vroVanCellProps)

  const resolveIcon = (icon: VroVanCellIcon) => {
    return typeof icon === 'string' ? { name: icon } : icon
  }
</script>
