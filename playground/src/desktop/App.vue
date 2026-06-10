<template>
  <DocLayout :simulator="simulator">
    <RouterView />
  </DocLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import DocLayout from './components/index.vue'

  const route = useRoute()

  onMounted(() => {
    document.documentElement.classList.add('van-doc-theme-light')
  })

  const simulator = computed(() => {
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
</script>

<style lang="scss">
  @use '../assets/scss/base.scss' as *;
  @use '../assets/scss/highlight.scss' as *;
</style>
