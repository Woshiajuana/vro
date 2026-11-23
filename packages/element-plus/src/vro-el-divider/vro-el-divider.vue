<template>
  <div
    class="vro-el-divider"
    :class="[
      `is-${props.direction}`,
      `is-${props.contentPosition}`,
      { 'is-empty': !props.content && !$slots.default },
    ]"
    :style="{ '--vro-el-divider-border-style': props.borderStyle }"
  >
    <span v-if="props.content || $slots.default" class="vro-el-divider-content">
      <slot>{{ props.content }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { vroElDividerProps, type VroElDividerSlots } from './types'

  defineOptions({ name: 'VroElDivider' })

  const props = defineProps(vroElDividerProps)
  defineSlots<VroElDividerSlots>()
</script>
