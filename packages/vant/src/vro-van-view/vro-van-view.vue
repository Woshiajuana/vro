<template>
  <div class="vro-van-view">
    <slot name="header">
      <VroVanNavbar> </VroVanNavbar>
    </slot>

    <div class="vro-van-view-inner">
      <slot></slot>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
  import { VroVanNavbar } from '../vro-van-navbar'
  import { vroVanViewProps } from './types'

  defineOptions({ name: 'VroVanView' })

  defineProps(vroVanViewProps)
</script>
