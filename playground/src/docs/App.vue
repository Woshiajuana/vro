<template>
  <div class="docs-app">
    <DocsHeader />
    <DocsSidebar />
    <DocsContainer>
      <DocsContent>
        <RouterView />
      </DocsContent>
    </DocsContainer>
    <DemoPlayground :src="simulatorSrc" />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import DemoPlayground from './components/DemoPlayground.vue'
  import DocsContainer from './components/DocsContainer.vue'
  import DocsContent from './components/DocsContent.vue'
  import DocsHeader from './components/DocsHeader.vue'
  import DocsSidebar from './components/DocsSidebar.vue'

  const route = useRoute()

  const simulatorSrc = computed(() => {
    const { packageName, componentDir } = route.meta

    if (!packageName || !componentDir) {
      return './demo.html#/'
    }

    return `./demo.html#/demo/${packageName}/${componentDir}`
  })

  watch(
    () => route.meta.title,
    (title) => {
      document.title = title ? `${title} - Vro Docs` : 'Vro Docs'
    },
    { immediate: true },
  )

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
  @use '@/assets/scss/global.scss' as *;

  .docs-app {
    min-width: 1100px;
  }
</style>
