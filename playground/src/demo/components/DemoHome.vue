<template>
  <div class="demo-home">
    <h1 class="demo-home__title">
      <img src="/img/logo.png" alt="Vro" />
      <span>Vro</span>
    </h1>
    <p class="demo-home__desc">组件演练场</p>

    <section v-for="group in routeGroups" :key="group.packageName" class="demo-home__group">
      <h2 class="demo-home__group-title">{{ group.title }}</h2>
      <RouterLink
        v-for="route in group.routes"
        :key="route.path"
        class="demo-home__link"
        :to="route.path"
      >
        <span>{{ route.meta?.title }}</span>
        <span class="demo-home__arrow" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { demoRoutes } from 'virtual:vro-playground-routes'

  const packageGroups = [
    { packageName: 'core', title: 'Core' },
    { packageName: 'element-plus', title: 'Element Plus' },
    { packageName: 'vant', title: 'Vant' },
  ] as const

  const routeGroups = computed(() => {
    return packageGroups
      .map((group) => ({
        ...group,
        routes: demoRoutes.filter((route) => route.meta?.packageName === group.packageName),
      }))
      .filter((group) => group.routes.length > 0)
  })
</script>

<style lang="scss" scoped>
  .demo-home {
    min-height: 100vh;
    padding: 46px 20px 28px;
  }

  .demo-home__title,
  .demo-home__desc {
    padding-left: 16px;
    font-weight: 400;
    line-height: 1;
    user-select: none;
  }

  .demo-home__title {
    display: flex;
    align-items: center;
    margin: 0 0 16px;
    color: var(--text-color);
    font-size: 32px;

    img {
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }
  }

  .demo-home__desc {
    margin: 0 0 32px;
    color: var(--text-color-4);
    font-size: 14px;
    line-height: 1.6;
  }

  .demo-home__group {
    margin-bottom: 24px;
  }

  .demo-home__group-title {
    margin: 0;
    padding: 0 16px 10px;
    color: var(--text-color-4);
    font-size: 14px;
    font-weight: 400;
  }

  .demo-home__link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    margin-bottom: 12px;
    padding: 0 16px;
    color: var(--text-color-2);
    font-size: 14px;
    line-height: 44px;
    background-color: var(--bg-color);
    border-radius: 22px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .demo-home__arrow {
    width: 7px;
    height: 7px;
    border: 1px solid var(--text-color-4);
    border-width: 1px 1px 0 0;
    transform: rotate(45deg);
  }
</style>
