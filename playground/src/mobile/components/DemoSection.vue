<template>
  <section class="vro-demo-section" :class="sectionClass">
    <slot />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const sectionClass = computed(() => route.meta.componentDir || '')
</script>

<style lang="scss" scoped>
  .vro-demo-section {
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
    background: var(--vro-doc-background-3);
  }
</style>
