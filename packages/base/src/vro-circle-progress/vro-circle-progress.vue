<template>
  <div
    class="vro-circle-progress"
    :style="style"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <svg class="vro-circle-progress-svg" viewBox="0 0 100 100">
      <circle
        class="vro-circle-progress-track"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidthValue"
      />
      <circle
        class="vro-circle-progress-line"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidthValue"
        :stroke-linecap="strokeLinecap"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
      />
    </svg>
    <div class="vro-circle-progress-content">
      <slot :value="value">{{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { clamp } from '@daysnap/utils'
  import { computed, type HTMLAttributes } from 'vue'

  import { addUnit } from '../utils'
  import { vroCircleProgressProps, type VroCircleProgressSlots } from './types'

  defineOptions({ name: 'VroCircleProgress' })

  const props = defineProps(vroCircleProgressProps)

  defineSlots<VroCircleProgressSlots>()

  const center = 50

  const value = computed(() => {
    return clamp(0, props.modelValue, 100)
  })

  const strokeWidthValue = computed(() => {
    return clamp(0, props.strokeWidth, 100)
  })

  const radius = computed(() => {
    return center - strokeWidthValue.value / 2
  })

  const text = computed(() => {
    return `${Math.round(value.value)}%`
  })

  const circumference = computed(() => {
    return 2 * Math.PI * radius.value
  })

  const strokeDashoffset = computed(() => {
    return circumference.value * (1 - value.value / 100)
  })

  const style = computed<HTMLAttributes['style']>(() => {
    return {
      '--size': addUnit(props.size) || 'var(--vro-circle-progress-size)',
      '--color': props.color || 'var(--vro-circle-progress-color)',
      '--background-color': props.backgroundColor || 'var(--vro-circle-progress-background-color)',
      '--duration': addUnit(props.duration, 'ms') || 'var(--vro-circle-progress-duration)',
      '--curve': props.curve || 'var(--vro-circle-progress-curve)',
    }
  })
</script>
