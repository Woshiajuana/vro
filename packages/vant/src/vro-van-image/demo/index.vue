<template>
  <demo-block title="基础用法">
    <vro-van-image class="demo-image" :src="imageUrl" alt="图片" />
  </demo-block>

  <demo-block title="加载失败占位">
    <vro-van-image class="demo-image" src="/not-found.png" :placeholder="placeholderUrl" />
  </demo-block>

  <demo-block title="图片预览">
    <vro-van-image class="demo-image" :preview="[imageUrl, previewUrl]" :src="imageUrl" />
    <vro-van-image
      class="demo-image"
      :preview="[imageUrl, previewUrl]"
      preview-index="1"
      :src="previewUrl"
    />
  </demo-block>

  <demo-block title="图片地址转换">
    <vro-van-image
      src="/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      base-url="https://fuss10.elemecdn.com"
      class="demo-image"
      ratio="300x300"
      preview-ratio="origin"
      :normalize-src="normalizeSrc"
    />
  </demo-block>

  <demo-block title="自定义加载样式">
    <vro-van-image
      class="demo-image demo-image-loading"
      :src="imageUrl"
      style="--vro-van-image-loading-size: min(18px, 16%)"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import type { VroVanImageNormalizeSrc } from '../types'

  const imageUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  const previewUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
  const placeholderUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'

  const normalizeSrc: VroVanImageNormalizeSrc = ({ src, ratio, baseUrl }) => {
    const url = src.startsWith('http') ? src : `${baseUrl}${src}`
    return ratio ? `${url}?ratio=${ratio}` : url
  }
</script>

<style lang="scss" scoped>
  .demo-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .demo-image-loading {
    --vro-van-image-loading-background: var(--van-blue-light);
  }
</style>
