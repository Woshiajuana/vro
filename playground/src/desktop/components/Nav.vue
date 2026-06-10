<template>
  <nav class="vro-doc-nav" :class="{ 'vro-doc-nav-fixed': isFixed }">
    <section v-for="group in navs" :key="group.packageName" class="vro-doc-nav__group">
      <h2 class="vro-doc-nav__title">{{ group.title }}</h2>
      <div v-for="item in group.items" :key="item.path" class="vro-doc-nav__item">
        <NavLink :item="item" />
      </div>
    </section>
  </nav>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import NavLink from './NavLink.vue'

  const router = useRouter()
  const isFixed = ref(false)

  const packageGroups = [
    { packageName: 'core', title: 'Core' },
    { packageName: 'element-plus', title: 'Element Plus' },
    { packageName: 'vant', title: 'Vant' },
  ] as const

  const navs = computed(() => {
    const routes = router
      .getRoutes()
      .filter((route) => route.meta?.type === 'docs')
      .sort((a, b) => a.path.localeCompare(b.path))

    return packageGroups
      .map((group) => ({
        ...group,
        items: routes.filter((route) => route.meta.packageName === group.packageName),
      }))
      .filter((group) => group.items.length > 0)
  })

  const onScroll = () => {
    isFixed.value = window.scrollY > 64
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scoped>
  .vro-doc-nav {
    position: absolute;
    top: var(--vro-doc-header-height);
    bottom: 0;
    left: 0;
    z-index: 1;
    width: var(--vro-doc-nav-width);
    padding: 8px 0;
    overflow-y: auto;
    background-color: var(--vro-doc-background-2);

    &.vro-doc-nav-fixed {
      position: fixed;
      top: 0;
    }
  }

  .vro-doc-nav__group {
    margin-bottom: 16px;
    padding-left: 6px;
  }

  .vro-doc-nav__title {
    padding: 24px 0 0 var(--vro-doc-padding);
    color: var(--vro-doc-text-color-2);
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
  }

  .vro-doc-nav__item {
    margin: 4px 0;
  }
</style>
