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
        :title="title"
        v-bind="navbarProps"
        class="vro-van-view-navbar"
        @click-left="$emit('click-left', $event)"
        @click-right="$emit('click-right', $event)"
      >
        <template v-if="$slots.navbar" #default>
          <slot name="navbar"></slot>
        </template>
        <template #title>
          <slot name="title">
            <span v-if="title" v-html="title" key="no-once"></span>
            <!-- todo vue3 这里使用 v-else 时，v-once 失效 -->
            <span v-if="!title" v-html="$route.meta?.title" v-once key="once"></span>
          </slot>
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
