<template>
  <main class="vro-doc-content" @click="onClick">
    <slot />
  </main>
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
        }
      })
    },
  )
</script>

<style lang="scss">
  .vro-doc-content {
    min-height: calc(100vh - var(--vro-doc-header-height) - var(--vro-doc-padding) * 2);
  }

  .vro-doc-markdown-body,
  .vro-doc-card {
    background-color: var(--vro-doc-background-2);
    border-radius: var(--vro-doc-border-radius);
  }

  .vro-doc-markdown-body {
    padding: 28px 32px 36px;
    overflow: hidden;

    > h1 {
      margin-bottom: 24px;
      color: var(--vro-doc-text-color-1);
      font-size: 32px;
      line-height: 1.4;
    }

    > h2 {
      margin: 36px 0 18px;
      color: var(--vro-doc-text-color-1);
      font-size: 24px;
      line-height: 1.6;
    }
  }

  .vro-doc-card {
    margin: 18px 0;
    padding: 20px 0 4px;

    > h3 {
      margin: 0 0 16px;
      color: var(--vro-doc-text-color-1);
      font-size: 20px;
      line-height: 1.6;
    }
  }

  .vro-doc-markdown-body,
  .vro-doc-card {
    p,
    li {
      color: var(--vro-doc-text-color-3);
      font-size: 15px;
      line-height: 1.8;
    }

    p {
      margin: 14px 0;
    }

    table {
      width: 100%;
      margin-top: 16px;
      color: var(--vro-doc-text-color-3);
      font-size: 14px;
      line-height: 1.5;
      border-collapse: collapse;
    }

    td,
    th {
      padding: 10px 12px;
      border-top: 1px solid var(--vro-doc-border-color);
      text-align: left;

      &:first-child {
        padding-left: 0;
      }
    }
  }
</style>
