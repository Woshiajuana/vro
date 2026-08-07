<template>
  <demo-block title="基础用法">
    <vro-van-image-uploader />
  </demo-block>

  <demo-block title="已有图片">
    <vro-van-image-uploader :model-value="imageUrl" :image-props="{ preview: true }" />
  </demo-block>

  <demo-block title="多图展示">
    <vro-van-image-uploader :model-value="images" :image-props="{ preview: images }" :max="4" />
  </demo-block>

  <demo-block title="预设图片位">
    <vro-van-image-uploader :model-value="images.slice(0, 1)" :preset="preset" />
  </demo-block>

  <demo-block title="文件类型和多选">
    <vro-van-image-uploader accept="image/png,image/jpeg" multiple :max="3" />
  </demo-block>

  <demo-block title="禁用状态">
    <vro-van-image-uploader disabled :model-value="imageUrl" />
  </demo-block>
</template>

<script setup lang="ts">
  import type { VroVanImageUploaderPresetItem } from '../types'

  const imageUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  const images = [
    imageUrl,
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ]
  const preset: VroVanImageUploaderPresetItem[] = [
    { label: '身份证人像面', required: true },
    { label: '身份证国徽面', required: true },
    { label: '手持证件照' },
  ]
</script>
