<template>
  <demo-block title="基础用法">
    <vro-el-image class="demo-image" :src="imageUrl" fit="cover" />
    <vro-el-image class="demo-image" fit="cover" />
  </demo-block>

  <demo-block title="图片地址转换">
    <vro-el-image
      class="demo-image"
      src="/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      base-url="https://fuss10.elemecdn.com"
      ratio="300x300"
      preview-ratio="origin"
      :preview-src-list="['/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
      :normalize-src="normalizeSrc"
      fit="cover"
    />
  </demo-block>

  <demo-block title="图片预览">
    <vro-el-image
      class="demo-image"
      :src="imageUrl"
      :preview-src-list="[imageUrl]"
      fit="cover"
      show-progress
    />
  </demo-block>

  <demo-block title="加载占位">
    <vro-el-image class="demo-image" :src="imageUrl" fit="cover">
      <template #placeholder>
        <div class="demo-image-placeholder">加载中</div>
      </template>
    </vro-el-image>
  </demo-block>

  <demo-block title="始终显示占位">
    <div class="demo-image-placeholder-root"></div>
    <vro-el-image
      class="demo-image"
      :src="imageUrl"
      fit="cover"
      lazy
      scroll-container=".demo-image-placeholder-root"
    >
    </vro-el-image>
    <vro-el-image
      class="demo-image-small"
      :src="imageUrl"
      fit="cover"
      lazy
      scroll-container=".demo-image-placeholder-root"
    />
  </demo-block>

  <demo-block title="占位配置">
    <div class="demo-image-placeholder-root"></div>
    <vro-el-image
      class="demo-image"
      :src="imageUrl"
      fit="cover"
      lazy
      scroll-container=".demo-image-placeholder-root"
      :loading-props="{ size: 28, color: 'var(--el-color-primary)', duration: 900 }"
    />
  </demo-block>

  <demo-block title="加载失败">
    <vro-el-image class="demo-image" src="/not-found.png" fit="cover" />
    <vro-el-image
      class="demo-image"
      src="/not-found.png"
      fit="cover"
      :icon-props="{ size: 32, color: 'var(--el-color-danger)' }"
    />
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
    --vro-el-image-placeholder-background: #f2f2f2;
  }

  .demo-image-small {
    width: 12px;
    height: 12px;
    margin-left: 12px;
  }

  .demo-image-placeholder-root {
    display: none;
  }

  .demo-image-error {
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color-light);
  }

  .demo-image-placeholder {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
  }

  .demo-image-error,
  .demo-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
