<template>
  <main class="docs-container has-sidebar has-header">
    <RouterView class="docs-content" />
    <DemoPlayground class="docs-playground" />
  </main>
</template>

<script setup lang="ts">
  import DemoPlayground from './DemoPlayground.vue'
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .docs-container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    &.has-sidebar {
      padding-left: var(--sidebar-width);
    }
    &.has-header {
      padding-top: var(--header-height);
    }
  }
  .docs-playground {
    position: fixed;
    background-color: red;
    top: 0;
    right: 30px;
    width: 300px;
    bottom: 30px;
  }
</style>
