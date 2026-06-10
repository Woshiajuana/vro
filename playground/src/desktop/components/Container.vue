<template>
  <div class="vro-doc-container vro-doc-row">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .vro-doc-container {
    min-height: calc(100vh - var(--vro-doc-header-height));
    padding: var(--vro-doc-padding)
      calc(var(--vro-doc-simulator-width) + var(--vro-doc-padding) * 2) var(--vro-doc-padding)
      calc(var(--vro-doc-nav-width) + var(--vro-doc-padding));
    overflow: hidden;
  }
</style>
