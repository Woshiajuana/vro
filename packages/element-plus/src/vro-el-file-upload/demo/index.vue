<template>
  <demo-block title="基础用法">
    <vro-el-file-upload v-model="value" :upload="upload" />
    <div class="demo-value">当前值：{{ formatValue(value) }}</div>
  </demo-block>

  <demo-block title="多文件上传">
    <vro-el-file-upload v-model="multipleValue" :max="3" accept="image/*" :upload="upload" />
    <div class="demo-value">当前值：{{ formatValue(multipleValue) }}</div>
  </demo-block>

  <demo-block title="自定义参数">
    <vro-el-file-upload
      v-model="paramsValue"
      :params="{ domain: 'https://cdn.example.com', folder: 'docs' }"
      :upload="uploadWithParams"
    />
    <div class="demo-value">当前值：{{ formatValue(paramsValue) }}</div>
  </demo-block>

  <demo-block title="禁用状态">
    <vro-el-file-upload v-model="disabledValue" :max="2" disabled :upload="upload" />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const paramsValue = ref('')
  const multipleValue = ref<string[]>([])
  const disabledValue = ref(['https://example.com/readme.pdf'])

  const upload = async (files: File[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return files.map((file) => `https://example.com/${file.name}`)
  }

  const uploadWithParams = async (
    files: File[],
    options: { params: { domain: string; folder: string } },
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return files.map((file) => `${options.params.domain}/${options.params.folder}/${file.name}`)
  }

  const formatValue = (value: string | string[]) => {
    return Array.isArray(value) ? value.join('、') || '-' : value || '-'
  }
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
  }
</style>
