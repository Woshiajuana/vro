<template>
  <div class="vro-loading" :style="loadingStyle" role="status" :aria-label="ariaLabel">
    <slot name="icon">
      <span v-if="type === 'spinner'" class="vro-loading-spinner" aria-hidden="true">
        <i v-for="item in 12" :key="item"></i>
      </span>

      <span v-else-if="type === 'dots'" class="vro-loading-dots" aria-hidden="true">
        <i v-for="item in 3" :key="item"></i>
      </span>

      <span v-else-if="type === 'image'" class="vro-loading-image" aria-hidden="true">
        <i v-for="item in 4" :key="item"></i>
      </span>

      <svg v-else class="vro-loading-circular" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { computed, type HTMLAttributes } from 'vue'

  import { addUnit } from '../utils'
  import { vroLoadingProps } from './types'

  defineOptions({ name: 'VroLoading' })

  const props = defineProps(vroLoadingProps)

  const loadingStyle = computed<HTMLAttributes['style']>(() => ({
    '--color': props.color || `var(--vro-loading-color)`,
    '--size': props.size || props.size === 0 ? addUnit(props.size) : `var(--vro-loading-size)`,
    '--duration':
      props.duration || props.duration === 0
        ? addUnit(props.duration, 'ms')
        : `var(--vro-loading-${props.type}-duration)`,
  }))
</script>
