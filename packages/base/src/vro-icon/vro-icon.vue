<template>
  <i class="vro-icon" :class="classes" :style="">
    <slot>
      <img v-if="isImage" class="vor-icon-image" />
    </slot>
  </i>
</template>

<script setup lang="ts">
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
    const { color } = props
    return { color, fontSize: }
  })
</script>
