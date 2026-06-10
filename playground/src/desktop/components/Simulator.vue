<template>
  <div class="van-doc-simulator" :class="{ 'van-doc-simulator-fixed': isFixed }">
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
  .van-doc-simulator {
    position: absolute;
    top: calc(var(--van-doc-padding) + var(--van-doc-header-top-height));
    right: var(--van-doc-padding);
    z-index: 1;
    box-sizing: border-box;
    width: var(--van-doc-simulator-width);
    min-width: var(--van-doc-simulator-width);
    overflow: hidden;
    background: var(--van-doc-background-2);
    border-radius: var(--van-doc-border-radius);

    @media (max-width: 1100px) {
      right: auto;
      left: 750px;
    }

    @media (min-width: var(--van-doc-row-max-width)) {
      right: 50%;
      margin-right: calc(var(--van-doc-row-max-width) / 2 * -1 + 24px);
    }

    &.van-doc-simulator-fixed {
      position: fixed;
      top: var(--van-doc-padding);
    }

    iframe {
      display: block;
      width: 100%;
    }
  }
</style>
