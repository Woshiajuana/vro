<template>
  <DocsHeader />
  <DocsSidebar />
  <DocsContainer>
    <DemoPlayground />
  </DocsContainer>
</template>

<script setup lang="ts">
  import DemoPlayground from './components/DemoPlayground.vue'
  import DocsContainer from './components/DocsContainer.vue'
  import DocsHeader from './components/DocsHeader.vue'
  import DocsSidebar from './components/DocsSidebar.vue'
</script>

<style lang="scss">
  @use '@/assets/scss/global.scss' as *;
</style>
