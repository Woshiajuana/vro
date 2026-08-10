<template>
  <div
    class="vro-circle-progress"
    :style="progress.style"
    role="progressbar"
    :aria-valuenow="progress.value"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <svg class="vro-circle-progress-svg" viewBox="0 0 100 100">
      <circle
        class="vro-circle-progress-track"
        :cx="center"
        :cy="center"
        :r="progress.radius"
        fill="none"
        :stroke-width="progress.strokeWidth"
      />
      <circle
        class="vro-circle-progress-line"
        :cx="center"
        :cy="center"
        :r="progress.radius"
        fill="none"
        :stroke-width="progress.strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-dasharray="progress.circumference"
        :stroke-dashoffset="progress.strokeDashoffset"
      />
    </svg>
    <div class="vro-circle-progress-content">
      <slot :value="progress.value">{{ progress.text }}</slot>
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

  const progress = computed(() => {
    const value = clamp(0, props.modelValue, 100)
    const strokeWidth = clamp(0, props.strokeWidth, 100)
    const radius = center - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    return {
      value,
      strokeWidth,
      radius,
      circumference,
      strokeDashoffset: circumference * (1 - value / 100),
      text: `${Math.round(value)}%`,
      style: {
        '--size': addUnit(props.size) || 'var(--vro-circle-progress-size)',
        '--color': props.color || 'var(--vro-circle-progress-color)',
        '--background-color':
          props.backgroundColor || 'var(--vro-circle-progress-background-color)',
        '--duration': addUnit(props.duration, 'ms') || 'var(--vro-circle-progress-duration)',
        '--curve': props.curve || 'var(--vro-circle-progress-curve)',
      } as HTMLAttributes['style'],
    }
  })
</script>
