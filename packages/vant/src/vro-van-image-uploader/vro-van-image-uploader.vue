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
            <vro-van-icon
              v-if="!disabled"
              class="vro-van-image-uploader-item-delete"
              name="van-icon-cross"
              @click.stop="handleDelete(index)"
            />
          </template>
          <template v-else>
            <div class="vro-van-image-uploader-item-trigger" @click="handleChooseMedia(index)">
              <vro-van-icon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
              <input
                v-if="!chooseMedia"
                :accept="accept"
                :disabled="!canUpload"
                :multiple="multiple"
                type="file"
                @change="handleUpload($event, index)"
              />
            </div>
          </template>
        </div>
        <span v-if="item.label" class="vro-van-image-uploader-item-label">
          {{ item.label }}
        </span>
      </div>
      <div v-if="canAdd" class="vro-van-image-uploader-item">
        <div class="vro-van-image-uploader-item-box">
          <div class="vro-van-image-uploader-item-trigger" @click="handleChooseMedia()">
            <vro-van-icon class="vro-van-image-uploader-item-plus" name="van-icon-plus" />
            <input
              v-if="!chooseMedia"
              :accept="accept"
              :disabled="!canUpload"
              :multiple="multiple"
              type="file"
              @change="handleUpload"
            />
          </div>
        </div>
      </div>
    </div>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { isArray, isString } from '@daysnap/utils'
  import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { VroVanImage } from '../vro-van-image'
  import {
    type VroVanImageUploaderEmits,
    type VroVanImageUploaderItem,
    type VroVanImageUploaderPresetItem,
    vroVanImageUploaderProps,
    type VroVanImageUploaderResult,
  } from './types'

  defineOptions({ name: 'VroVanImageUploader' })

  const emit = defineEmits<VroVanImageUploaderEmits>()
  const props = defineProps(vroVanImageUploaderProps)
  const previewUrlMap = new Map<File, string>()

  const images = ref<(VroVanImageUploaderPresetItem & { url?: VroVanImageUploaderItem })[]>([])

  const defaultUpload = async (files: File[]) => files

  const value = computed(() => {
    const { modelValue } = props
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const canUpload = computed(() => !props.disabled && value.value.length < props.max)
  const canAdd = computed(() => canUpload.value && images.value.length < props.max)

  const getImageUrl = (url?: VroVanImageUploaderItem) => {
    if (!url) {
      return ''
    }

    if (isString(url)) {
      return url
    }

    let previewUrl = previewUrlMap.get(url)
    if (!previewUrl) {
      previewUrl = URL.createObjectURL(url)
      previewUrlMap.set(url, previewUrl)
    }
    return previewUrl
  }

  const normalizeResult = (result: VroVanImageUploaderResult) => {
    return result.slice(0, props.max - value.value.length)
  }

  const emitUpdate = (nextValue: VroVanImageUploaderItem[]) => {
    let modelValue = props.modelValue

    if (isArray(modelValue)) {
      modelValue = nextValue
    } else {
      modelValue = nextValue[0] ?? ''
    }

    emit('update:modelValue', modelValue)
    emit('change', modelValue)
  }

  const mergeValue = (result: VroVanImageUploaderResult, index?: number) => {
    const uploadValue = normalizeResult(result)
    if (!uploadValue.length) {
      return
    }

    const nextValue = [...value.value]
    if (typeof index === 'number') {
      while (nextValue.length < index) {
        nextValue.push('')
      }
      nextValue.splice(index, 1, ...uploadValue)
    } else {
      nextValue.push(...uploadValue)
    }

    emitUpdate(nextValue.slice(0, props.max))
  }

  const handleUpload = async (event: Event, index?: number) => {
    const target = event.target as HTMLInputElement
    const files = Array.from(target.files ?? [])
    target.value = ''

    if (!files.length || !canUpload.value) {
      return
    }

    try {
      const upload = props.upload || defaultUpload
      const result = await upload(files.slice(0, props.max - value.value.length), {
        compress: false,
        params: props.params,
      })
      mergeValue(result, index)
    } catch (error) {
      emit('error', error)
    }
  }

  const handleChooseMedia = async (index?: number) => {
    if (!props.chooseMedia || !canUpload.value) {
      return
    }

    try {
      const result = await props.chooseMedia({
        max: props.max,
        value: value.value,
        multiple: props.multiple,
        upload: props.upload || defaultUpload,
      })
      mergeValue(result, index)
    } catch (error) {
      emit('error', error)
    }
  }

  const handleDelete = (index: number) => {
    const item = value.value[index]
    if (!item || props.disabled) {
      return
    }

    if (item instanceof File) {
      const previewUrl = previewUrlMap.get(item)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        previewUrlMap.delete(item)
      }
    }

    const nextValue = [...value.value]
    nextValue.splice(index, 1)
    emit('delete', item, index)
    emitUpdate(nextValue)
  }

  watchEffect(() => {
    const { preset = [] } = props
    images.value = preset
      .map((item, index) => {
        const url = value.value[index] || ''
        return { ...item, url }
      })
      .concat(value.value.slice(preset.length).map((url) => ({ url })))
  })

  onBeforeUnmount(() => {
    previewUrlMap.forEach((url) => URL.revokeObjectURL(url))
    previewUrlMap.clear()
  })
</script>
