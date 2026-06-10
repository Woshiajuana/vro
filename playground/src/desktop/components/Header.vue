<template>
  <header class="vro-doc-header">
    <div class="vro-doc-row">
      <div class="vro-doc-header__top">
        <RouterLink class="vro-doc-header__logo" to="/">
          <img src="/img/logo.png" alt="Vro" />
          <span>Vro</span>
        </RouterLink>
        <div class="vro-doc-header__subtitle">组件文档</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .vro-doc-header {
    position: relative;
    z-index: 2;
    width: 100%;
    background-color: var(--vro-doc-background-2);
    border-bottom: 1px solid var(--vro-doc-border-color);
    user-select: none;
  }

  .vro-doc-header__top {
    display: flex;
    align-items: center;
    height: var(--vro-doc-header-height);
    padding: 0 var(--vro-doc-padding);
  }

  .vro-doc-header__logo {
    display: inline-flex;
    align-items: center;
    min-width: calc(var(--vro-doc-nav-width) - var(--vro-doc-padding));
    color: var(--vro-doc-text-color-1);
    font-size: 22px;
    font-weight: 700;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }

  .vro-doc-header__subtitle {
    color: var(--vro-doc-text-color-3);
    font-size: 14px;
  }
</style>
