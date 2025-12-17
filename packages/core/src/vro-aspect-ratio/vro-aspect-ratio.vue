<template>
  <div class="vro-aspect-ratio">
    <div class="vro-aspect-ratio-inner" :style="style">
      <div class="vro-aspect-ratio-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { vroAspectRatioProps } from './types'

  defineOptions({ name: 'VroAspectRatio' })

  const props = defineProps(vroAspectRatioProps)

  const style = computed(() => ({
    paddingTop: `${100 / props.value}%`,
  }))
</script>
