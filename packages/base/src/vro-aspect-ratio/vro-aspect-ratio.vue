<template>
  <div class="vro-aspect-ratio">
    <div class="vro-aspect-ratio-inner" :style="innerStyle">
      <div class="vro-aspect-ratio-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { vroAspectRatioProps } from './types'

  defineOptions({ name: 'VroAspectRatio' })

  const props = defineProps(vroAspectRatioProps)

  const innerStyle = computed(() => ({
    paddingTop: `${100 / props.ratio}%`,
  }))
</script>
