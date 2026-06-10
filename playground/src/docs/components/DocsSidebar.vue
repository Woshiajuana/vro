<template>
  <aside class="docs-sidebar">
    <nav class="docs-sidebar__nav">
      <section v-for="group in routeGroups" :key="group.packageName" class="docs-sidebar__group">
        <h2 class="docs-sidebar__title">{{ group.title }}</h2>
        <RouterLink
          v-for="route in group.routes"
          :key="route.path"
          :to="route.path"
          class="docs-sidebar__link"
          active-class="is-active"
        >
          {{ route.meta?.title }}
        </RouterLink>
      </section>
    </nav>
  </aside>
</template>

<script setup lang="ts">
  import { docsRoutes } from 'virtual:vro-playground-routes'
  import { computed } from 'vue'
  import type { RouteRecordRaw } from 'vue-router'

  const packageGroups = [
    { packageName: 'core', title: 'Core' },
    { packageName: 'element-plus', title: 'Element Plus' },
    { packageName: 'vant', title: 'Vant' },
  ] as const

  const routeGroups = computed(() => {
    return packageGroups
      .map((group) => ({
        ...group,
        routes: docsRoutes.filter((route) => route.meta?.packageName === group.packageName),
      }))
      .filter((group): group is typeof group & { routes: RouteRecordRaw[] } => {
        return group.routes.length > 0
      })
  })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/define.scss' as *;

  .docs-sidebar {
    position: fixed;
    width: var(--sidebar-width);
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
    box-sizing: border-box;
    border-right: 1px solid var(--border-color);
    background-color: var(--bg-color);
    overflow-y: auto;
  }

  .docs-sidebar__nav {
    padding: calc(var(--header-height) + 20px) 16px 24px;
  }

  .docs-sidebar__group {
    & + & {
      margin-top: 24px;
    }
  }

  .docs-sidebar__title {
    margin-bottom: 8px;
    padding: 0 8px;
    color: #606266;
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
  }

  .docs-sidebar__link {
    display: flex;
    align-items: center;
    min-height: 34px;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 6px 10px;
    color: #303133;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    transition:
      background-color 0.2s,
      color 0.2s;

    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }

    &.is-active {
      background-color: #ecf5ff;
      color: #409eff;
      font-weight: 600;
    }
  }
</style>
