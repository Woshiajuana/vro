<template>
  <article class="docs-content" @click="onClick">
    <slot />
  </article>
</template>

<script setup lang="ts">
  import { nextTick, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof HTMLElement)) {
      return
    }

    if (['H2', 'H3', 'H4', 'H5'].includes(target.tagName) && target.id) {
      router.push({
        name: route.name ?? undefined,
        hash: `#${target.id}`,
      })
    }
  }

  watch(
    () => route.fullPath,
    () => {
      nextTick(() => {
        if (route.hash) {
          document.querySelector(route.hash)?.scrollIntoView()
        } else {
          window.scrollTo({ top: 0 })
        }
      })
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .docs-content {
    min-height: calc(100vh - var(--header-height) - var(--doc-padding) * 2);
    padding: 28px 32px 36px;
    overflow: hidden;
    background-color: var(--bg-color);
    border-radius: var(--doc-border-radius);
  }

  .docs-content :deep(h1) {
    margin-bottom: 24px;
    color: var(--text-color);
    font-size: 32px;
    line-height: 1.4;
  }

  .docs-content :deep(h2),
  .docs-content :deep(h3),
  .docs-content :deep(h4),
  .docs-content :deep(h5) {
    color: var(--text-color);
    font-weight: 600;
    line-height: 1.6;
  }

  .docs-content :deep(h2) {
    margin: 36px 0 18px;
    font-size: 24px;
  }

  .docs-content :deep(h3) {
    margin: 28px 0 14px;
    font-size: 20px;
  }

  .docs-content :deep(h4) {
    margin: 24px 0 12px;
    font-size: 18px;
  }

  .docs-content :deep(p),
  .docs-content :deep(li) {
    color: var(--text-color-3);
    font-size: 15px;
    line-height: 1.8;
  }

  .docs-content :deep(p) {
    margin: 14px 0;
  }

  .docs-content :deep(table) {
    width: 100%;
    margin-top: 16px;
    color: var(--text-color-3);
    font-size: 14px;
    line-height: 1.5;
    border-collapse: collapse;
  }

  .docs-content :deep(td),
  .docs-content :deep(th) {
    padding: 10px 12px;
    border-top: 1px solid var(--border-color);
    text-align: left;
  }

  .docs-content :deep(pre) {
    margin: 16px 0;
    padding: 16px;
    overflow: auto;
    background-color: #f7f8fa;
    border-radius: 8px;
  }

  .docs-content :deep(code) {
    font-family: var(--code-font-family);
  }
</style>
