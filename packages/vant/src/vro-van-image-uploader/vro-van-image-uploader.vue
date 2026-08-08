<template>
  <vro-van-cell class="vro-van-image-uploader" direction="column">
    <div class="vro-van-image-uploader-content">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="vro-van-image-uploader-item"
        :class="{ 'is-required': item.required }"
      >
        <div class="vro-van-image-uploader-item-box">
          <template v-if="item.url">
            <vro-van-image v-bind="imageProps" :src="getImageUrl(item.url)" />
            <vro-van-icon class="vro-van-image-uploader-item-delete" name="van-icon-cross" />
          </template>
          <template v-else>
            <vro-van-icon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
            <input :accept="accept" :disabled="disabled" :multiple="multiple" type="file" />
          </template>
        </div>
        <span v-if="item.label" class="vro-van-image-uploader-item-label">
          {{ item.label }}
        </span>
      </div>
      <div class="vro-van-image-uploader-item">
        <div class="vro-van-image-uploader-item-box">
          <vro-van-icon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
          <input :accept="accept" :disabled="disabled" :multiple="multiple" type="file" />
        </div>
      </div>
    </div>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { isArray, isString } from '@daysnap/utils'
  import { ref, watchEffect } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { VroVanImage } from '../vro-van-image'
  import {
    type VroVanImageUploaderItem,
    type VroVanImageUploaderPresetItem,
    vroVanImageUploaderProps,
  } from './types'

  defineOptions({ name: 'VroVanImageUploader' })

  const props = defineProps(vroVanImageUploaderProps)

  const images = ref<(VroVanImageUploaderPresetItem & { url?: VroVanImageUploaderItem })[]>([])

  const getImageUrl = (url?: VroVanImageUploaderItem) => {
    return isString(url) ? url : ''
  }

  watchEffect(() => {
    const { preset = [], modelValue } = props
    const value = isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
    images.value = preset
      .map((item, index) => {
        const url = value[index] || ''
        return { ...item, url }
      })
      .concat(value.slice(preset.length).map((url) => ({ url })))
  })
</script>
