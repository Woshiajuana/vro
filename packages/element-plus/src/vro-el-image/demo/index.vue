<template>
  <demo-block title="基础用法">
    <vro-el-image class="demo-image" :src="imageUrl" fit="cover" />
  </demo-block>

  <demo-block title="图片地址转换">
    <vro-el-image
      class="demo-image"
      src="/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      base-url="https://fuss10.elemecdn.com"
      ratio="300x300"
      :preview-src-list="['/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
      :normalize-src="normalizeSrc"
      fit="cover"
    />
  </demo-block>

  <demo-block title="加载失败">
    <vro-el-image class="demo-image" src="/not-found.png" fit="cover">
      <template #error>
        <div class="demo-image-error">加载失败</div>
      </template>
    </vro-el-image>
  </demo-block>
</template>

<script setup lang="ts">
  import type { VroElImageNormalizeSrc } from '../types'

  const imageUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

  const normalizeSrc: VroElImageNormalizeSrc = ({ src, ratio, baseUrl }) => {
    const url = src.startsWith('http') ? src : `${baseUrl}${src}`
    return ratio ? `${url}?ratio=${ratio}` : url
  }
</script>

<style scoped lang="scss">
  .demo-image {
    width: 180px;
    height: 180px;
  }

  .demo-image-error {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color-light);
  }
</style>
