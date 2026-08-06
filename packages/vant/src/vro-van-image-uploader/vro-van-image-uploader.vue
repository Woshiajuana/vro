<template>
  <VroVanCell class="vro-van-image-uploader" direction="column">
    <div class="vro-van-image-uploader-content">
      <div class="vro-van-image-uploader-item">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon name="van-icon-plus" />
        </div>
      </div>
      <div class="vro-van-image-uploader-item">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon name="van-icon-plus" />
        </div>
      </div>
    </div>
  </VroVanCell>
</template>

<script setup lang="ts">
  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanImageUploaderProps } from './types'

  defineOptions({ name: 'VroVanImageUploader' })

  defineProps(vroVanImageUploaderProps)
</script>
