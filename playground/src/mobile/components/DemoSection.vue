<template>
  <section class="van-doc-demo-section">
    <slot />
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .van-doc-demo-section {
    box-sizing: border-box;
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
  }
</style>
