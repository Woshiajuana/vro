<template>
  <div
    class="vro-circle-progress"
    :style="progress.style"
    role="progressbar"
    :aria-valuenow="progress.value"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <svg class="vro-circle-progress-svg" :viewBox="progress.viewBox">
      <circle
        class="vro-circle-progress-track"
        :cx="progress.center"
        :cy="progress.center"
        :r="progress.radius"
        fill="none"
        :stroke-width="progress.strokeWidth"
      />
      <circle
        class="vro-circle-progress-line"
        :cx="progress.center"
        :cy="progress.center"
        :r="progress.radius"
        fill="none"
        :stroke-width="progress.strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-dasharray="progress.circumference"
        :stroke-dashoffset="progress.strokeDashoffset"
        @transitionend="handleTransitionEnd"
      />
    </svg>
    <slot :value="progress.value">{{ progress.text }}</slot>
  </div>
</template>

<script setup lang="ts">
  import { clamp } from '@daysnap/utils'
  import { computed, type HTMLAttributes } from 'vue'

  import { addUnit } from '../utils'
  import {
    type VroCircleProgressEmits,
    vroCircleProgressProps,
    type VroCircleProgressSlots,
  } from './types'

  defineOptions({ name: 'VroCircleProgress' })

  const props = defineProps(vroCircleProgressProps)
  const emit = defineEmits<VroCircleProgressEmits>()

  defineSlots<VroCircleProgressSlots>()

  const getNumber = (value: string | number) => {
    const numberValue = Number(value)
    return Number.isFinite(numberValue) ? numberValue : undefined
  }

  const getDuration = (value: string | number) => {
    if (typeof value === 'number') return value

    const duration = Number.parseFloat(value)
    if (!Number.isFinite(duration)) return 0
    return value.trim().endsWith('ms') ? duration : duration * 1000
  }

  const progress = computed(() => {
    const size = getNumber(props.size) || 100
    const center = size / 2
    const value = clamp(0, props.modelValue, 100)
    const strokeWidth = clamp(0, getNumber(props.strokeWidth) || 0, size)
    const radius = center - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    return {
      center,
      value,
      strokeWidth,
      radius,
      circumference,
      viewBox: `0 0 ${size} ${size}`,
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

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== 'stroke-dashoffset' || getDuration(props.duration) <= 0) return
    emit('finish', progress.value.value)
  }
</script>
