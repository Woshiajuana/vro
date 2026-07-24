<template>
  <el-image v-bind="elImageProps" class="vro-el-image">
    <template #placeholder>
      <slot name="placeholder">
        <div class="vro-el-image-placeholder">
          <vro-loading type="image" v-bind="loadingProps" />
        </div>
      </slot>
    </template>
    <template #error>
      <slot name="error">
        <div class="vro-el-image-error">
          <vro-el-icon v-bind="iconProps" class="vro-el-image-error-icon">
            <svg
              t="1784873125909"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21481"
              width="256"
              height="256"
            >
              <path
                d="M551.424 605.696L412.16 457.216l-44.544-44.544c-2.048 1.024-3.584 3.584-5.632 5.632L73.216 767.488V172.032c2.048-15.872 14.848-26.112 29.696-26.112H496.64l64-73.216H64c-35.328 0-64 28.16-64 65.024v749.056c0 35.328 28.672 65.024 64 65.024h221.696L552.96 643.584c8.704-10.752 8.704-27.648-1.536-37.888zM757.76 437.76c60.416 0 109.568-49.152 109.568-109.568S818.176 218.624 757.76 218.624s-109.568 49.152-109.568 109.568S697.344 437.76 757.76 437.76zM960 72.704H746.496c-1.024 2.048-2.048 5.632-4.608 6.656l-56.832 66.048H921.6c15.872 0 28.672 11.264 29.696 27.648L952.32 768 723.968 523.776c-6.656-8.192-16.896-13.824-29.696-13.824-11.264 0-19.456 5.632-29.696 12.8l-10.24 8.192 67.584 71.68c10.24 10.24 10.24 26.112 1.024 37.888L453.632 949.76h506.88c35.328 0 64-28.672 64-65.024v-747.52C1024 100.864 995.328 72.704 960 72.704z"
                p-id="21482"
              ></path>
            </svg>
          </vro-el-icon>
        </div>
      </slot>
    </template>
  </el-image>
</template>

<script setup lang="ts">
  import { isUndefined, omitBy, pick, typedKeys } from '@daysnap/utils'
  import { VroLoading } from '@vrojs/base'
  import { ElImage, imageProps } from 'element-plus'
  import { computed } from 'vue'

  import { VroElIcon } from '../vro-el-icon'
  import { type VroElImageProps, vroElImageProps, type VroElImageSlots } from './types'
  import { getVroElImageOptions } from './utils'

  defineOptions({ name: 'VroElImage' })
  defineSlots<VroElImageSlots>()

  const props = defineProps(vroElImageProps)
  const elImageProps = computed(() => {
    const dynamicProps: VroElImageProps = {
      ...getVroElImageOptions(),
      ...omitBy(props, isUndefined),
    } as VroElImageProps

    const { ratio, previewRatio, normalizeSrc, baseUrl } = dynamicProps
    let { src, previewSrcList } = dynamicProps
    if (normalizeSrc) {
      src = normalizeSrc({ src, ratio, baseUrl })

      if (previewSrcList?.length) {
        previewSrcList = previewSrcList.map((src) =>
          normalizeSrc({ src, ratio: previewRatio ?? ratio, baseUrl }),
        )
      }
    }

    return { ...pick(dynamicProps, typedKeys(imageProps)), src, previewSrcList }
  })
</script>
