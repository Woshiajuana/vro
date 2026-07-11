<template>
  <i class="vro-icon" :class="classes" :style="style">
    <slot>
      <img v-if="isImage" :src="name" />
    </slot>
  </i>
</template>

<script setup lang="ts">
  import { computed, type HTMLAttributes } from 'vue'

  import { addUnit } from '../utils'
  import { vroIconProps } from './types'

  defineOptions({ name: 'VroIcon' })
  const props = defineProps(vroIconProps)

  const isImage = computed(() => props.name?.includes('/') ?? false)

  const classes = computed<HTMLAttributes['class']>(() => {
    const { fontFamily, name, loading } = props
    const res: HTMLAttributes['class'] = []
    if (isImage.value) {
      res.push(fontFamily, name)
    }
    if (loading) {
      res.push('is-loading')
    }
    return res
  })

  const style = computed<HTMLAttributes['style']>(() => {
    const { color, size } = props
    return { color, fontSize: addUnit(size) }
  })
</script>
