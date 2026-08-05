<template>
  <img
    class="vro-van-image"
    :class="{ 'is-loading': loading }"
    v-bind="imageProps"
    @error="handleError"
    @load="handleLoad"
    @click="handlePreview"
  />
</template>

<script setup lang="ts">
  import { filterEmptyValue, isArray, isBoolean, isString } from '@daysnap/utils'
  import { showImagePreview } from 'vant'
  import { computed, ref } from 'vue'

  import { vroVanImageProps } from './types'

  defineOptions({ name: 'VroVanImage' })

  const props = defineProps(vroVanImageProps)

  const loading = ref(true)

  const imageProps = computed(() => {
    // eslint-disable-next-line prefer-const
    let { src, baseUrl, ratio, normalizeSrc, alt } = props
    if (normalizeSrc && src) {
      src = normalizeSrc({ src, ratio, baseUrl })
    }
    return filterEmptyValue({
      alt,
      src,
    })
  })

  const handleError = (event: Event) => {
    const target = event.target as HTMLImageElement
    const { src } = target
    const { placeholder } = props
    if (placeholder && src !== placeholder) {
      target.src = placeholder
    }
  }

  const handleLoad = () => {
    loading.value = true
  }

  // 预览
  const handlePreview = async (event: Event) => {
    // eslint-disable-next-line prefer-const
    let { preview, previewRatio, previewIndex = 0, src, normalizeSrc, baseUrl } = props
    if (previewRatio && !preview) {
      preview = true
    }
    if (preview === false) {
      return
    }
    if (!src) {
      return
    }

    event.stopPropagation()

    let images: string[] = []
    if (!preview || isBoolean(preview)) {
      images = [src]
    } else if (isString(preview)) {
      images = [preview]
    } else if (isArray(preview)) {
      images = preview
    }
    if (normalizeSrc) {
      images = images.map((src) => normalizeSrc({ src, baseUrl, ratio: previewRatio }))
    }

    showImagePreview({
      images,
      startPosition: +previewIndex,
    })
  }
</script>
