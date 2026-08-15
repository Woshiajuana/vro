<template>
  <div class="vro-van-navbar">
    <span>vro-van-navbar</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanNavbarProps } from './types'

  defineOptions({ name: 'VroVanNavbar' })

  defineProps(vroVanNavbarProps)
</script>
