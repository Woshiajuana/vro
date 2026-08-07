<template>
  <VroVanCell class="vro-van-image-uploader" direction="column">
    <div class="vro-van-image-uploader-content">
      <div class="vro-van-image-uploader-item is-required">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input type="file" />
        </div>
        <span class="vro-van-image-uploader-item-label">身份证反面</span>
      </div>
      <div class="vro-van-image-uploader-item is-required">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input type="file" />
          <VroVanIcon class="vro-van-image-uploader-item-delete" name="van-icon-cross" />
        </div>
        <span class="vro-van-image-uploader-item-label">身份证正面</span>
      </div>
      <div class="vro-van-image-uploader-item is-required">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input type="file" />
          <VroVanImage />
          <VroVanIcon class="vro-van-image-uploader-item-delete" name="van-icon-cross" />
        </div>
        <span class="vro-van-image-uploader-item-label">身份证正面</span>
      </div>
      <div class="vro-van-image-uploader-item">
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input type="file" />
        </div>
      </div>
    </div>
  </VroVanCell>
</template>

<script setup lang="ts">
  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { VroVanImage } from '../vro-van-image'
  import { vroVanImageUploaderProps } from './types'

  defineOptions({ name: 'VroVanImageUploader' })

  defineProps(vroVanImageUploaderProps)
</script>
