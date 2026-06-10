<template>
  <header class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <RouterLink class="van-doc-header__logo" to="/">
          <img src="/img/logo.png" alt="Vro" />
          <span class="van-doc-header__title">Vro</span>
        </RouterLink>
        <span class="van-doc-header__subtitle">组件文档</span>

        <ul class="van-doc-header__top-nav">
          <li class="van-doc-header__top-nav-item">
            <button
              class="van-doc-header__link van-doc-header__theme"
              type="button"
              :title="themeTitle"
              @click="toggleTheme"
            >
              <img :src="themeImg" :alt="themeTitle" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  import type { Theme } from '@/utils'
  import { getDefaultTheme, syncThemeToChild } from '@/utils'

  const currentTheme = ref<Theme>(getDefaultTheme())

  const themeImg = computed(() =>
    currentTheme.value === 'light'
      ? 'https://b.yzcdn.cn/vant/dark-theme.svg'
      : 'https://b.yzcdn.cn/vant/light-theme.svg',
  )
  const themeTitle = computed(() =>
    currentTheme.value === 'light' ? '切换到深色模式' : '切换到浅色模式',
  )

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  watch(
    currentTheme,
    (newVal, oldVal) => {
      window.localStorage.setItem('vantTheme', newVal)
      if (oldVal) {
        document.documentElement.classList.remove(`van-doc-theme-${oldVal}`)
      }
      document.documentElement.classList.add(`van-doc-theme-${newVal}`)
      syncThemeToChild(newVal)
    },
    { immediate: true },
  )
</script>

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

  .van-doc-header__top-nav {
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 0;
    text-align: right;
    list-style: none;
  }

  .van-doc-header__top-nav-item {
    display: inline-block;
    vertical-align: middle;
  }

  .van-doc-header__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin: 0;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
</style>
