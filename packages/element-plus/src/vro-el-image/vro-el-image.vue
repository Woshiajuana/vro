<template>
  <el-image v-bind="props" class="vro-el-image">
    <template #placeholder>
      <slot name="placeholder">
        <div class="vro-el-image-placeholder">
          <span>加载中</span>
        </div>
      </slot>
    </template>
  </el-image>
</template>

<script setup lang="ts">
  import { isUndefined, omitBy } from '@daysnap/utils'
  import { ElImage } from 'element-plus'
  import { computed } from 'vue'

  import { type VroElImageProps, vroElImageProps, type VroElImageSlots } from './types'
  import { getVroElImageOptions } from './utils'

  defineOptions({ name: 'VroElImage' })
  defineSlots<VroElImageSlots>()

  const rawProps = defineProps(vroElImageProps)
  const props = computed(() => {
    // eslint-disable-next-line prefer-const
    let { ratio, previewRatio, previewSrcList, normalizeSrc, baseUrl, src, ...rest } = {
      ...getVroElImageOptions(),
      ...omitBy(rawProps, isUndefined),
    } as VroElImageProps

    if (normalizeSrc) {
      src = normalizeSrc({ src, ratio, baseUrl })

      if (previewSrcList?.length) {
        previewSrcList = previewSrcList.map((src) =>
          normalizeSrc({ src, ratio: previewRatio ?? ratio, baseUrl }),
        )
      }
    }

    return { ...rest, src, previewSrcList }
  })
</script>
