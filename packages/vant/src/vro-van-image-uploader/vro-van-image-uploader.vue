<template>
  <div class="vro-van-image-uploader">
    <span>vro-van-image-uploader</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanImageUploaderProps } from './types'

  defineOptions({ name: 'VroVanImageUploader' })

  defineProps(vroVanImageUploaderProps)
</script>
