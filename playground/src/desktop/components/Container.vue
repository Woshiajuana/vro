<template>
  <div class="van-doc-container van-doc-row van-doc-container--with-simulator">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .van-doc-container {
    box-sizing: border-box;
    padding-left: var(--van-doc-nav-width);
    overflow: hidden;

    &--with-simulator {
      padding-right: calc(var(--van-doc-simulator-width) + var(--van-doc-padding));

      @media (max-width: 1100px) {
        padding-right: calc(var(--van-doc-simulator-width) - 8px);
      }
    }
  }
</style>
