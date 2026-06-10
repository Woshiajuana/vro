<template>
  <div class="vro-demo-home">
    <h1 class="vro-demo-home__title">
      <img src="/img/logo.png" alt="Vro" />
      <span>Vro</span>
    </h1>
    <p class="vro-demo-home__desc">组件演练场</p>

    <section v-for="group in navs" :key="group.packageName" class="vro-demo-home__group">
      <h2 class="vro-demo-home__group-title">{{ group.title }}</h2>
      <RouterLink
        v-for="item in group.items"
        :key="item.path"
        class="vro-demo-home__link"
        :to="item.path"
      >
        <span>{{ item.meta?.title }}</span>
        <span class="vro-demo-home__arrow" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const packageGroups = [
    { packageName: 'core', title: 'Core' },
    { packageName: 'element-plus', title: 'Element Plus' },
    { packageName: 'vant', title: 'Vant' },
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
  .vro-demo-home {
    min-height: 100vh;
    padding: 46px 20px 28px;
    background: var(--vro-doc-background-3);
  }

  .vro-demo-home__title,
  .vro-demo-home__desc {
    padding-left: 16px;
    font-weight: 400;
    line-height: 1;
    user-select: none;
  }

  .vro-demo-home__title {
    display: flex;
    align-items: center;
    margin: 0 0 16px;
    color: var(--vro-doc-text-color-1);
    font-size: 32px;

    img {
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }
  }

  .vro-demo-home__desc {
    margin: 0 0 32px;
    color: var(--vro-doc-text-color-4);
    font-size: 14px;
    line-height: 1.6;
  }

  .vro-demo-home__group {
    margin-bottom: 24px;
  }

  .vro-demo-home__group-title {
    margin: 0;
    padding: 0 16px 10px;
    color: var(--vro-doc-text-color-4);
    font-size: 14px;
    font-weight: 400;
  }

  .vro-demo-home__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    margin-bottom: 12px;
    padding: 0 16px;
    color: var(--vro-doc-text-color-2);
    font-size: 14px;
    line-height: 44px;
    background-color: var(--vro-doc-background-2);
    border-radius: 22px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .vro-demo-home__arrow {
    width: 7px;
    height: 7px;
    border: 1px solid var(--vro-doc-text-color-4);
    border-width: 1px 1px 0 0;
    transform: rotate(45deg);
  }
</style>
