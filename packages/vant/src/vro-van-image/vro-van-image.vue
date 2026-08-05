<template>
  <img src="vro-van-image" />
</template>

<script setup lang="ts">
  import { vroVanImageProps } from './types'

  defineOptions({ name: 'VroVanImage' })

  defineProps(vroVanImageProps)
</script>
