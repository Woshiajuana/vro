<template>
  <main class="docs-container has-sidebar has-header">
    <ElSplitter>
      <ElSplitterPanel>
        <RouterView class="docs-content" />
      </ElSplitterPanel>
      <ElSplitterPanel>
        <slot></slot>
      </ElSplitterPanel>
    </ElSplitter>
  </main>
</template>

<script setup lang="ts"></script>

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
</style>
