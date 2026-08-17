<template>
  <div
    v-if="fixed && placeholder"
    class="vro-van-navbar-placeholder"
    :class="{ 'is-safe-area-inset-top': safeAreaInsetTop }"
  ></div>
  <div
    v-bind="$attrs"
    class="vro-van-navbar"
    :class="{
      'is-fixed': fixed,
      'is-border': border,
      'is-safe-area-inset-top': safeAreaInsetTop,
    }"
    :style="{ zIndex }"
  >
    <div class="vro-van-navbar-inner">
      <div
        class="vro-van-navbar-left"
        :class="{ 'is-clickable': $slots.left || leftArrow || leftText }"
        @click="$slots.left || leftArrow || leftText ? $emit('click-left', $event) : undefined"
      >
        <slot name="left">
          <vro-van-icon v-if="leftArrow" class="vro-van-navbar-left-icon" :name="leftIcon" />
          <span v-if="leftText">{{ leftText }}</span>
        </slot>
      </div>

      <slot>
        <div class="vro-van-navbar-title">
          <slot name="title">{{ title }}</slot>
        </div>
      </slot>

      <div
        class="vro-van-navbar-right"
        :class="{ 'is-clickable': $slots.right || rightText }"
        @click="$slots.right || rightText ? $emit('click-right', $event) : undefined"
      >
        <slot name="right">
          <span v-if="rightText">{{ rightText }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { VroVanIcon } from '../vro-van-icon'
  import { type VroVanNavbarEmits, vroVanNavbarProps, type VroVanNavbarSlots } from './types'

  defineOptions({ name: 'VroVanNavbar' })

  defineSlots<VroVanNavbarSlots>()
  defineEmits<VroVanNavbarEmits>()
  defineProps(vroVanNavbarProps)
</script>
