<template>
  <i class="vro-icon" :class="classes" :style="style">
    <slot>
      <img v-if="isImage" :src="name" />
    </slot>
  </i>
</template>

<script setup lang="ts">
  import { isNumeric } from '@daysnap/utils'
  import { computed, type HTMLAttributes } from 'vue'

  import { vroIconProps } from './types'

  defineOptions({ name: 'VroIcon' })
  const props = defineProps(vroIconProps)

  const isImage = computed(() => props.name?.includes('/') ?? false)

  const classes = computed<HTMLAttributes['class']>(() => {
    const { fontFamily, name } = props
    return isImage.value ? [] : [fontFamily, name]
  })

  const style = computed<HTMLAttributes['style']>(() => {
    const { color, size } = props
    return { color, fontSize: isNumeric(size) ? `${size}px` : size }
  })
</script>
