<template>
  <header class="docs-header">
    <div class="docs-header__inner">
      <RouterLink class="docs-header__logo" to="/">
        <img src="/img/logo.png" alt="Vro" />
        <span>Vro</span>
      </RouterLink>
      <div class="docs-header__title">组件文档</div>
    </div>
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
  }

  .docs-header__inner {
    display: flex;
    align-items: center;
    gap: 24px;
    border-bottom: 1px solid var(--border-color);
    height: var(--header-height);
    padding: 0 var(--doc-padding);
    background-color: rgba(255, 255, 255, 0.86);
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);
  }

  .docs-header__logo {
    display: inline-flex;
    align-items: center;
    width: calc(var(--sidebar-width) - var(--doc-padding));
    color: var(--text-color);
    font-size: 22px;
    font-weight: 700;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }

  .docs-header__title {
    color: var(--text-color-3);
    font-size: 14px;
  }
</style>
