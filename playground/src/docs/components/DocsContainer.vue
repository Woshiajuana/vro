<template>
  <main class="docs-container">
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .docs-container {
    width: 100%;
    min-height: 100vh;
    padding: var(--doc-padding) calc(var(--simulator-width) + var(--doc-padding) * 2)
      var(--doc-padding) calc(var(--sidebar-width) + var(--doc-padding));
    padding-top: calc(var(--header-height) + var(--doc-padding));
  }
</style>
