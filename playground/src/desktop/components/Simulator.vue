<template>
  <div class="vro-doc-simulator" :class="{ 'vro-doc-simulator-fixed': isFixed }">
    <iframe :src="src" :style="simulatorStyle" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount } from 'vue'

  import { useWindowScroll } from '@/utils'

  defineProps<{
    src: string
  }>()

  const { scrollTop, windowHeight, dispose } = useWindowScroll()

  const isFixed = computed(() => scrollTop.value > 60)
  const simulatorStyle = computed(() => ({
    height: `${Math.min(640, windowHeight.value - 90)}px`,
  }))

  onBeforeUnmount(dispose)
</script>

<style lang="scss" scoped>
  .vro-doc-simulator {
    position: absolute;
    top: calc(var(--vro-doc-padding) + var(--vro-doc-header-height));
    right: var(--vro-doc-padding);
    z-index: 1;
    width: var(--vro-doc-simulator-width);
    overflow: hidden;
    background: var(--vro-doc-background-2);
    border-radius: var(--vro-doc-border-radius);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

    &.vro-doc-simulator-fixed {
      position: fixed;
      top: var(--vro-doc-padding);
    }

    iframe {
      display: block;
      width: 100%;
      background: var(--vro-doc-background-3);
    }
  }
</style>
