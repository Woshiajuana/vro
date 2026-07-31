<template>
  <div class="vro-loading" :style="loadingStyle" role="status" :aria-label="ariaLabel">
    <slot name="icon">
      <svg
        v-if="type === 'spinner'"
        class="vro-loading-spinner"
        viewBox="0 0 1024 1024"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248M828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0"
        ></path>
      </svg>

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
