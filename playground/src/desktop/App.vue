<template>
  <ElConfigProvider :locale="zhCn">
    <DocLayout :simulator="simulator">
      <RouterView />
    </DocLayout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import { getDefaultTheme } from '@/utils'

  import DocLayout from './components/index.vue'

  const route = useRoute()

  document.documentElement.classList.add(`van-doc-theme-${getDefaultTheme()}`)

  const simulator = computed(() => {
    const path = location.pathname.replace(/\/index(\.html)?/, '/')
    return `${path}demo.html${location.hash}`
  })

  watch(
    () => route.meta.title,
    (title) => {
      document.title = title ? `${title} - Vro Docs` : 'Vro Docs'
    },
    { immediate: true },
  )
</script>

<style lang="scss">
  @use '../assets/scss/base.scss' as *;
  @use '../assets/scss/highlight.scss' as *;
</style>
