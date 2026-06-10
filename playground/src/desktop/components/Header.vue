<template>
  <header class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <RouterLink class="van-doc-header__logo" to="/">
          <img src="/img/logo.png" alt="Vro" />
          <span class="van-doc-header__title">Vro</span>
        </RouterLink>
        <span class="van-doc-header__subtitle">组件文档</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .van-doc-header {
    width: 100%;
    background-color: var(--van-doc-header-background);
    user-select: none;
    position: relative;
    z-index: 2;
  }

  .van-doc-header__top {
    display: flex;
    align-items: center;
    height: var(--van-doc-header-top-height);
    padding: 0 var(--van-doc-padding);
  }

  .van-doc-header__logo {
    display: block;

    img {
      display: inline-block;
      width: 28px;
      margin-right: 12px;
      vertical-align: middle;
    }
  }

  .van-doc-header__title {
    color: var(--van-doc-white);
    font-size: 22px;
    font-weight: 600;
    vertical-align: middle;
  }

  .van-doc-header__subtitle {
    display: inline-block;
    margin-left: 16px;
    color: var(--van-doc-gray-5);
    font-size: 14px;
    vertical-align: middle;
  }
</style>
