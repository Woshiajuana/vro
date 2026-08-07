<template>
  <VroVanCell class="vro-van-image-uploader" direction="column">
    <div class="vro-van-image-uploader-content">
      <div
        v-for="(item, index) in preset"
        :key="index"
        class="vro-van-image-uploader-item"
        :class="{ 'is-required': item.required }"
      >
        <div class="vro-van-image-uploader-item-box">
          <VroVanIcon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input type="file" />
        </div>
        <span v-if="item.label" class="vro-van-image-uploader-item-label">
          {{ item.label }}
        </span>
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
