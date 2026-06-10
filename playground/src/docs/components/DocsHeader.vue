<template>
  <header class="docs-header has-sidebar">
    <div class="docs-header-inner"></div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .docs-header {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;

    &.has-sidebar {
      padding-left: var(--sidebar-width);
    }
  }
  .docs-header-inner {
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);
    height: var(--header-height);
    padding: 0 12px 0 24px;
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);
  }
</style>
