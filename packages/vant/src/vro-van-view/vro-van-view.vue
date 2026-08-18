<template>
  <div
    class="vro-van-view"
    :class="{
      'is-scrollable': scrollable,
    }"
  >
    <slot name="header">
      <vro-van-navbar
        v-if="showNavbar"
        safe-area-inset-top
        v-bind="navbarProps"
        class="vro-van-view-navbar"
        @click-left="$emit('click-left', $event)"
        @click-right="$emit('click-right', $event)"
      >
        <template v-if="$slots.navbar" #default>
          <slot name="navbar"></slot>
        </template>
        <template v-if="$slots.title" #title>
          <slot name="title"></slot>
        </template>
        <template v-if="$slots.left" #left>
          <slot name="left"></slot>
        </template>
        <template v-if="$slots.right" #right>
          <slot name="right"></slot>
        </template>
      </vro-van-navbar>
    </slot>

    <main class="vro-van-view-inner">
      <slot></slot>
    </main>

    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
  import { VroVanNavbar } from '../vro-van-navbar'
  import { type VroVanViewEmits, vroVanViewProps, type VroVanViewSlots } from './types'

  defineOptions({ name: 'VroVanView' })

  defineSlots<VroVanViewSlots>()
  defineEmits<VroVanViewEmits>()
  defineProps(vroVanViewProps)
</script>
