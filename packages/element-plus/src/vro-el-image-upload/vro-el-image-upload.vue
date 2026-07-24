<template>
  <div class="vro-el-image-upload">
    <vue-draggable
      class="vro-el-image-upload-content"
      :disabled="dynamicProps.disabled || dynamicProps.max <= 1"
      :animation="150"
      :model-value="computeValue"
      filter=".vro-el-image-upload-btn"
      @update:model-value="handleUpdate"
    >
      <div
        class="vro-el-image-upload-item"
        v-for="(item, index) in computeValue"
        :key="getItemKey(item, index)"
      >
        <vro-el-image
          v-bind="dynamicProps.imageProps"
          class="vro-el-image-upload-image"
          :src="previewValue[index]"
          :preview-src-list="previewValue"
          :initial-index="index"
        />
        <el-icon
          v-if="!dynamicProps.disabled"
          class="vro-el-image-upload-clear"
          @click="handleDelete(index)"
        >
          <circle-close-filled />
        </el-icon>
      </div>
      <div
        v-if="computeValue.length < dynamicProps.max && !dynamicProps.disabled"
        v-loading="loading"
        class="vro-el-image-upload-item vro-el-image-upload-btn"
      >
        <el-icon class="vro-el-image-upload-add"><plus /></el-icon>
        <input
          type="file"
          accept="image/*"
          :disabled="loading"
          :multiple="dynamicProps.max > 1"
          @change="handleUpload"
        />
      </div>
    </vue-draggable>
    <el-checkbox v-if="!dynamicProps.disabled && dynamicProps.compressible" v-model="compress">
      {{ t('imageUpload.compressText') }}
    </el-checkbox>
  </div>
</template>

<script setup lang="ts">
  import { isArray, isBoolean, isUndefined, omitBy } from '@daysnap/utils'
  import { CircleCloseFilled, Plus } from '@element-plus/icons-vue'
  import { useAsyncTask } from '@vrojs/use'
  import { ElCheckbox, ElIcon, ElLoading } from 'element-plus'
  import { computed, onBeforeUnmount, ref, watch } from 'vue'
  import { VueDraggable } from 'vue-draggable-plus'

  import { useLocale } from '../locale'
  import { VroElImage } from '../vro-el-image'
  import {
    type VroElImageUploadCallback,
    type VroElImageUploadEmits,
    type VroElImageUploadItem,
    type VroElImageUploadModelValue,
    type VroElImageUploadProps,
    vroElImageUploadProps,
    type VroElImageUploadUploadResult,
  } from './types'
  import { getVroElImageUploadOptions } from './utils'

  defineOptions({ name: 'VroElImageUpload' })

  const emit = defineEmits<VroElImageUploadEmits>()
  const props = defineProps(vroElImageUploadProps)
  const { t } = useLocale()
  const previewUrlMap = new Map<File, string>()

  const defaultUpload: VroElImageUploadCallback = async (files) => files

  const dynamicProps = computed(() => {
    const {
      compressible = false,
      upload = defaultUpload,
      ...rest
    } = {
      ...getVroElImageUploadOptions(),
      ...omitBy(props, isUndefined),
    } as VroElImageUploadProps

    return {
      upload,
      compressible,
      compress: isBoolean(compressible) ? compressible : compressible.value,
      ...rest,
    }
  })

  const vLoading = ElLoading.directive
  const compress = ref(dynamicProps.value.compress)

  const computeValue = computed(() => {
    const { modelValue } = dynamicProps.value
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const previewValue = computed(() => computeValue.value.map((item) => getPreviewSrc(item)))

  const getPreviewSrc = (item: VroElImageUploadItem) => {
    if (typeof item === 'string') {
      return item
    }

    let url = previewUrlMap.get(item)
    if (!url) {
      url = URL.createObjectURL(item)
      previewUrlMap.set(item, url)
    }
    return url
  }

  const getItemKey = (item: VroElImageUploadItem, index: number) => {
    if (typeof item === 'string') {
      return `${item}-${index}`
    }
    return `${item.name}-${item.size}-${item.lastModified}-${index}`
  }

  const revokePreviewUrl = (item: VroElImageUploadItem) => {
    if (typeof item === 'string') {
      return
    }

    const url = previewUrlMap.get(item)
    if (url) {
      URL.revokeObjectURL(url)
      previewUrlMap.delete(item)
    }
  }

  const isFileList = (value: VroElImageUploadUploadResult): value is File[] => {
    return value.some((item) => item instanceof File)
  }

  const handleUpdate = (value: VroElImageUploadItem[]) => {
    if (isArray(dynamicProps.value.modelValue)) {
      emit('update:modelValue', value)
    }
  }

  const handleDelete = (index: number) => {
    let value: VroElImageUploadModelValue = ''
    const item = computeValue.value[index]
    if (item) {
      revokePreviewUrl(item)
    }

    if (isArray(dynamicProps.value.modelValue)) {
      value = [...dynamicProps.value.modelValue]
      value.splice(index, 1)
    }
    emit('update:modelValue', value)
  }

  const { loading, trigger: handleUpload } = useAsyncTask(
    async (event: Event) => {
      const target = event.target as HTMLInputElement
      const files = Array.from(target.files ?? [])

      target.value = ''
      if (!files?.length) {
        return
      }

      const { max, upload = defaultUpload, params } = dynamicProps.value

      const res = await upload(files.slice(0, max - computeValue.value.length), {
        compress: compress.value,
        params,
      })
      if (!res.length) {
        return
      }

      let value: VroElImageUploadModelValue = isFileList(res) ? res : res[0]
      if (isArray(dynamicProps.value.modelValue)) {
        value = [...dynamicProps.value.modelValue, ...res]
      }
      emit('update:modelValue', value)
    },
    {
      throwError: true,
    },
  )

  watch(
    () => dynamicProps.value.compress,
    (value) => {
      compress.value = value
    },
  )

  onBeforeUnmount(() => {
    previewUrlMap.forEach((url) => URL.revokeObjectURL(url))
    previewUrlMap.clear()
  })
</script>
