<template>
  <ElImage v-bind="props" class="vro-el-image">
    <template v-for="name in slotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </ElImage>
</template>

<script setup lang="ts">
  import { isUndefined, omitBy } from '@daysnap/utils'
  import { ElImage } from 'element-plus'
  import type { Slots } from 'vue'
  import { computed, useSlots } from 'vue'

  import { type VroElImageProps, vroElImageProps } from './types'
  import { getVroElImageOptions } from './utils'

  defineOptions({ name: 'VroElImage' })

  const rawProps = defineProps(vroElImageProps)
  const slots: Slots = useSlots()
  const slotNames = computed(() => Object.keys(slots))
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
