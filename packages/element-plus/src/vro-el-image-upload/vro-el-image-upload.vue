<template>
  <div class="vro-el-image-upload">
    <VueDraggable
      class="vro-el-image-upload-content"
      :disabled="max <= 1"
      :animation="150"
      :model-value="computeValue"
      filter=".vro-el-image-upload-btn"
      @update:model-value="handleUpdate"
    >
      <div class="vro-el-image-upload-item" v-for="(item, index) in computeValue" :key="item">
        <VroElImage
          class="vro-el-image-upload-image"
          v-bind="imageProps"
          :src="item"
          :preview-src-list="computeValue"
          :initial-index="index"
        />
        <ElIcon v-if="!disabled" class="vro-el-image-upload-clear" @click="handleDelete(index)">
          <CircleCloseFilled />
        </ElIcon>
      </div>
      <div
        v-if="computeValue.length < max && !disabled"
        v-loading="loading"
        class="vro-el-image-upload-item vro-el-image-upload-btn"
      >
        <ElIcon class="vro-el-image-upload-add"><Plus /></ElIcon>
        <input type="file" accept="image/*" :multiple="max > 1" @change="handleUpload" />
      </div>
    </VueDraggable>
    <ElCheckbox v-if="!disabled && compressible" v-model="compress">是否压缩</ElCheckbox>
  </div>
</template>

<script setup lang="ts">
  import { isArray, isBoolean, isUndefined, omitBy } from '@daysnap/utils'
  import { useAsyncTask } from '@daysnap/vue-use'
  import { CircleCloseFilled, Plus } from '@element-plus/icons-vue'
  import { ElCheckbox, ElIcon, ElLoading } from 'element-plus'
  import { computed, ref } from 'vue'
  import { VueDraggable } from 'vue-draggable-plus'

  import { VroElImage } from '../vro-el-image'
  import { type VroElImageUploadProps, vroElImageUploadProps } from './types'
  import { getVroElImageUploadOptions } from './utils'

  defineOptions({ name: 'VroElImageUpload' })

  const emit = defineEmits(['update:modelValue'])
  const rawProps = defineProps(vroElImageUploadProps)

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

      const { modelValue, max, upload, params } = props.value

      if (!upload) {
        throw new Error('not set upload')
      }

      const res = await upload(files.slice(0, max - (modelValue?.length ?? 0)), {
        compress: compress.value,
        params,
      })

      let value: string | string[] = res[0]
      if (isArray(modelValue)) {
        value = [...modelValue, ...res]
      }
      emit('update:modelValue', value)
    },
    {
      throwError: true,
    },
  )
</script>
