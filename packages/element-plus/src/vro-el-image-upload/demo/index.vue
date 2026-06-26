<template>
  <demo-block title="基础用法">
    <vro-el-image-upload v-model="value" />
    <div class="demo-value">当前值：{{ formatValue(value) }}</div>
  </demo-block>

  <demo-block title="多图上传">
    <vro-el-image-upload v-model="multipleValue" :max="3" />
    <div class="demo-value">当前值：{{ formatValue(multipleValue) }}</div>
  </demo-block>

  <demo-block title="自定义上传">
    <vro-el-image-upload v-model="urlValue" :upload="upload" />
    <div class="demo-value">当前值：{{ formatValue(urlValue) }}</div>
  </demo-block>

  <demo-block title="图片压缩">
    <vro-el-image-upload v-model="compressValue" compressible :upload="upload" />
    <div class="demo-value">当前值：{{ formatValue(compressValue) }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref<File[]>([])
  const urlValue = ref('')
  const compressValue = ref('')
  const multipleValue = ref<File[]>([])

  const upload = async (files: File[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return files.map((file) => URL.createObjectURL(file))
  }

  const formatValue = (value: string | Array<string | File>) => {
    if (Array.isArray(value)) {
      return value.map((item) => (item instanceof File ? item.name : item)).join('、') || '-'
    }
    return value || '-'
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
