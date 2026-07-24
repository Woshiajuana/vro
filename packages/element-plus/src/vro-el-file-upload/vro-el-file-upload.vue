<template>
  <div class="vro-el-file-upload">
    <el-button
      v-if="computeValue.length < dynamicProps.max && !dynamicProps.disabled"
      class="vro-el-file-upload-btn"
      :loading="loading"
      :disabled="dynamicProps.disabled"
      type="primary"
      :icon="Upload"
    >
      {{ t('fileUpload.btnText') }}
      <input
        type="file"
        :accept="dynamicProps.accept"
        :multiple="dynamicProps.max > 1"
        @change="handleUpload"
      />
    </el-button>

    <ul class="vro-el-file-upload-content">
      <li class="vro-el-file-upload-item" v-for="(item, index) in computeValue" :key="item">
        <a :href="item" target="_blank">{{ item }}</a>
        <el-icon
          v-if="!dynamicProps.disabled"
          class="vro-el-file-upload-clear"
          @click="handleDelete(index)"
        >
          <circle-close-filled />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { isArray, isUndefined, omitBy } from '@daysnap/utils'
  import { CircleCloseFilled, Upload } from '@element-plus/icons-vue'
  import { useAsyncTask } from '@vrojs/use'
  import { ElButton, ElIcon } from 'element-plus'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import {
    type VroElFileUploadEmits,
    type VroElFileUploadModelValue,
    type VroElFileUploadProps,
    vroElFileUploadProps,
  } from './types'
  import { getVroElFileUploadOptions } from './utils'

  defineOptions({ name: 'VroElFileUpload' })

  const emit = defineEmits<VroElFileUploadEmits>()

  const props = defineProps(vroElFileUploadProps)

  const { t } = useLocale()

  const dynamicProps = computed(() => {
    return {
      ...getVroElFileUploadOptions(),
      ...omitBy(props, isUndefined),
    } as VroElFileUploadProps
  })

  const computeValue = computed(() => {
    const { modelValue } = dynamicProps.value
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const handleDelete = (index: number) => {
    let value: VroElFileUploadModelValue = ''
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

      const { modelValue, max, upload, params } = dynamicProps.value

      if (!upload) {
        throw new Error('not set upload')
      }

      const res = await upload(files.slice(0, max - computeValue.value.length), { params })

      let value: VroElFileUploadModelValue = res[0]
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
