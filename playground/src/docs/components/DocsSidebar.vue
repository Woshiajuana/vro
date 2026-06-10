<template>
  <aside class="docs-sidebar"></aside>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .docs-sidebar {
    position: fixed;
    width: var(--sidebar-width);
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
    box-sizing: border-box;
    border-right: 1px solid var(--border-color);
  }
</style>
