<template>
  <div class="demo-playground" :class="{ 'is-fixed': isFixed }">
    <iframe :src="src" :style="iframeStyle" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

  defineProps<{
    src: string
  }>()

  const scrollTop = ref(0)
  const windowHeight = ref(window.innerHeight)

  const isFixed = computed(() => scrollTop.value > 60)

  const iframeStyle = computed(() => {
    const height = Math.min(640, windowHeight.value - 90)
    return {
      height: `${height}px`,
    }
  })

  const onScroll = () => {
    scrollTop.value = window.scrollY
  }

  const onResize = () => {
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .demo-playground {
    position: absolute;
    top: calc(var(--header-height) + var(--doc-padding));
    right: var(--doc-padding);
    z-index: 1;
    width: var(--simulator-width);
    overflow: hidden;
    background-color: var(--bg-color);
    border-radius: var(--doc-border-radius);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

    &.is-fixed {
      position: fixed;
      top: var(--doc-padding);
    }

    iframe {
      display: block;
      width: 100%;
      background-color: var(--bg-color-2);
    }
  }
</style>
