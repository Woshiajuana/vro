<template>
  <div class="vro-el-file-upload">
    <el-button
      v-if="computeValue.length < max && !disabled"
      class="vro-el-file-upload-btn"
      :loading="loading"
      :disabled="disabled"
      type="primary"
      icon="upload"
    >
      {{ t('fileUpload.btnText') }}
      <input type="file" :accept="accept" :multiple="max > 1" @change="handleUpload" />
    </el-button>

    <ul class="vro-el-file-upload-content">
      <li class="vro-el-file-upload-item" v-for="(item, index) in computeValue" :key="index">
        <a :href="item" target="_blank">{{ item }}</a>
        <el-icon v-if="!disabled" @click="handleDelete(index)">
          <circle-close-filled />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { isArray, isUndefined, omitBy } from '@daysnap/utils'
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  import { useAsyncTask } from '@vrojs/use'
  import { ElButton, ElIcon } from 'element-plus'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { type VroElFileUploadProps, vroElFileUploadProps } from './types'
  import { getVroElFileUploadOptions } from './utils'

  defineOptions({ name: 'VroElFileUpload' })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | string[]): void
  }>()

  const rawProps = defineProps(vroElFileUploadProps)

  const { t } = useLocale()

  const props = computed(() => {
    return {
      ...getVroElFileUploadOptions(),
      ...omitBy(rawProps, isUndefined),
    } as VroElFileUploadProps
  })

  const computeValue = computed(() => {
    const { modelValue } = props.value
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

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

      const res = await upload(files.slice(0, max - computeValue.value.length), { params })

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
