<template>
  <div class="vro-van-config-provider">
    <span>vro-van-config-provider</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanConfigProviderProps } from './types'

  defineOptions({ name: 'VroVanConfigProvider' })

  defineProps(vroVanConfigProviderProps)
</script>
