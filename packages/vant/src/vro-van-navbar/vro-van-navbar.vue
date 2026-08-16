<template>
  <div
    v-if="fixed && placeholder"
    class="vro-van-navbar-placeholder"
    :class="{ 'is-safe-area-inset-top': safeAreaInsetTop }"
  ></div>
  <div
    class="vro-van-navbar"
    :class="{
      'is-fixed': fixed,
      'is-border': border,
      'is-safe-area-inset-top': safeAreaInsetTop,
    }"
    :style="{ zIndex }"
  >
    <div class="vro-van-navbar-inner">
      <button class="vro-van-navbar-left" type="button" @click="$emit('click-left', $event)">
        <slot name="left">
          <vro-van-icon v-if="leftArrow" class="vro-van-navbar-left-icon" :name="leftIcon" />
          <span v-if="leftText" class="vro-van-navbar-left-text">{{ leftText }}</span>
        </slot>
      </button>

      <div class="vro-van-navbar-title">
        <slot name="title">{{ title }}</slot>
      </div>

      <button class="vro-van-navbar-right" type="button" @click="$emit('click-right', $event)">
        <slot name="right">
          <span v-if="rightText" class="vro-van-navbar-right-text">{{ rightText }}</span>
        </slot>
      </button>
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
