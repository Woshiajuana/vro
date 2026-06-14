<template>
  <div class="vro-el-image-upload">
    <vue-draggable
      class="vro-el-image-upload-content"
      :disabled="props.disabled || props.max <= 1"
      :animation="150"
      :model-value="computeValue"
      filter=".vro-el-image-upload-btn"
      @update:model-value="handleUpdate"
    >
      <div class="vro-el-image-upload-item" v-for="(item, index) in computeValue" :key="item">
        <el-image
          class="vro-el-image-upload-image"
          v-bind="props.imageProps"
          :src="item"
          :preview-src-list="computeValue"
          :initial-index="index"
        />
        <el-icon
          v-if="!props.disabled"
          class="vro-el-image-upload-clear"
          @click="handleDelete(index)"
        >
          <circle-close-filled />
        </el-icon>
      </div>
      <div
        v-if="computeValue.length < props.max && !props.disabled"
        v-loading="loading"
        class="vro-el-image-upload-item vro-el-image-upload-btn"
      >
        <el-icon class="vro-el-image-upload-add"><plus /></el-icon>
        <input type="file" accept="image/*" :multiple="props.max > 1" @change="handleUpload" />
      </div>
    </vue-draggable>
    <el-checkbox v-if="!props.disabled && props.compressible" v-model="compress">
      {{ t('imageUpload.compressText') }}
    </el-checkbox>
  </div>
</template>

<script setup lang="ts">
  import { isArray, isBoolean, isUndefined, omitBy } from '@daysnap/utils'
  import { CircleCloseFilled, Plus } from '@element-plus/icons-vue'
  import { useAsyncTask } from '@vrojs/use'
  import { ElCheckbox, ElIcon, ElImage, ElLoading } from 'element-plus'
  import { computed, ref } from 'vue'
  import { VueDraggable } from 'vue-draggable-plus'

  import { useLocale } from '../locale'
  import { type VroElImageUploadProps, vroElImageUploadProps } from './types'
  import { getVroElImageUploadOptions } from './utils'

  defineOptions({ name: 'VroElImageUpload' })

  const emit = defineEmits<{
    'update:modelValue': [value: string | string[]]
  }>()
  const rawProps = defineProps(vroElImageUploadProps)
  const { t } = useLocale()

  const props = computed(() => {
    const {
      compressible = false,
      upload,
      ...rest
    } = {
      ...getVroElImageUploadOptions(),
      ...omitBy(rawProps, isUndefined),
    } as VroElImageUploadProps

    return {
      upload,
      compressible,
      compress: isBoolean(compressible) ? compressible : compressible.value,
      ...rest,
    }
  })

  const vLoading = ElLoading.directive
  const compress = ref(props.value.compress)

  const computeValue = computed(() => {
    const { modelValue } = props.value
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const handleUpdate = (value: string[]) => {
    if (isArray(props.value.modelValue)) {
      emit('update:modelValue', value)
    }
  }

  const handleDelete = (index: number) => {
    let value: string | string[] = ''
    if (isArray(props.value.modelValue)) {
      value = [...props.value.modelValue]
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

      const { max, upload, params } = props.value

      if (!upload) {
        throw new Error('not set upload')
      }

      const res = await upload(files.slice(0, max - computeValue.value.length), {
        compress: compress.value,
        params,
      })

      let value: string | string[] = res[0]
      if (isArray(props.value.modelValue)) {
        value = [...props.value.modelValue, ...res]
      }
      emit('update:modelValue', value)
    },
    {
      throwError: true,
    },
  )
</script>
