<template>
  <div
    class="vro-loading"
    :class="{
      'vro-loading--vertical': vertical,
    }"
    :style="loadingStyle"
    role="status"
    :aria-label="ariaLabel"
  >
    <slot name="icon">
      <span v-if="type === 'spinner'" class="vro-loading__spinner" aria-hidden="true">
        <i v-for="item in 12" :key="item"></i>
      </span>

      <span v-else-if="type === 'dots'" class="vro-loading__dots" aria-hidden="true">
        <i v-for="item in 3" :key="item"></i>
      </span>

      <svg v-else class="vro-loading__circular" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </slot>

    <span v-if="$slots.default || text" class="vro-loading__text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { vroLoadingProps } from './types'

  defineOptions({ name: 'VroLoading' })

  const props = defineProps(vroLoadingProps)

  const addUnit = (value?: string | number) => {
    if (typeof value === 'number') {
      return `${value}px`
    }
    return value || undefined
  }

  const loadingStyle = computed(() => ({
    '--vro-loading-size': addUnit(props.size),
    '--vro-loading-color': props.color,
    '--vro-loading-text-color': props.textColor || props.color,
    '--vro-loading-text-size': addUnit(props.textSize),
  }))
</script>
