<template>
  <demo-block title="基础用法">
    <vro-el-image-upload v-model="value" :upload="upload" />
    <div class="demo-value">当前值：{{ value || '-' }}</div>
  </demo-block>

  <demo-block title="多图上传">
    <vro-el-image-upload v-model="multipleValue" :max="3" :upload="upload" />
    <div class="demo-value">
      当前值：{{ multipleValue.length ? multipleValue.join('、') : '-' }}
    </div>
  </demo-block>

  <demo-block title="图片压缩">
    <vro-el-image-upload v-model="compressValue" compressible :upload="upload" />
    <div class="demo-value">当前值：{{ compressValue || '-' }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const compressValue = ref('')
  const multipleValue = ref<string[]>([])

  const upload = async (files: File[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return files.map((file) => URL.createObjectURL(file))
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
