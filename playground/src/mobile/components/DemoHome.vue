<template>
  <div class="demo-home">
    <h1 class="demo-home__title">
      <img src="/img/logo.png" alt="Vro" />
      <span>Vro</span>
    </h1>
    <h2 class="demo-home__desc">组件演练场</h2>

    <div v-for="group in navs" :key="group.packageName" class="demo-home-nav">
      <div class="demo-home-nav__title">{{ group.title }}</div>
      <div class="demo-home-nav__group">
        <RouterLink
          v-for="item in group.items"
          :key="item.path"
          class="demo-home-nav__block"
          :to="item.path"
        >
          {{ item.meta?.title }}
          <svg class="demo-home-nav__icon" viewBox="0 0 1024 1024">
            <path
              fill="#B6C3D2"
              d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"
            />
            <path
              fill="#B6C3D2"
              d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const packageGroups = [
    { packageName: 'base', title: 'Base' },
    { packageName: 'element-plus', title: 'Element Plus' },
    { packageName: 'vant', title: 'Vant' },
    { packageName: 'use', title: 'Use' },
  ] as const

  const navs = computed(() => {
    const routes = router
      .getRoutes()
      .filter((route) => route.meta?.type === 'demo')
      .sort((a, b) => a.path.localeCompare(b.path))

    return packageGroups
      .map((group) => ({
        ...group,
        items: routes.filter((route) => route.meta.packageName === group.packageName),
      }))
      .filter((group) => group.items.length > 0)
  })
</script>

<style lang="scss" scoped>
  .demo-home {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 46px 20px 28px;

    &__title,
    &__desc {
      padding-left: 16px;
      font-weight: normal;
      line-height: 1;
      user-select: none;
    }

    &__title {
      margin: 0 0 16px;
      font-size: 32px;

      img,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      img {
        width: 32px;
      }

      span {
        margin-left: 16px;
      }
    }

    &__desc {
      margin: 0 0 40px;
      color: var(--van-doc-text-color-4);
      font-size: 14px;
      line-height: 1.6;
    }
  }

  .demo-home-nav {
    &__title {
      margin: 24px 0 8px 16px;
      color: var(--van-doc-text-color-4);
      font-size: 14px;
    }

    &__block {
      position: relative;
      display: flex;
      margin: 0 0 12px;
      padding-left: 20px;
      color: var(--van-doc-text-color-3);
      font-weight: 600;
      font-size: 14px;
      line-height: 40px;
      background-color: var(--van-doc-background-3);
      border-radius: 99px;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }

    &__icon {
      position: absolute;
      top: 50%;
      right: 16px;
      width: 16px;
      height: 16px;
      margin-top: -8px;
    }
  }
</style>
