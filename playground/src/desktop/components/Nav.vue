<template>
  <nav class="van-doc-nav" :class="{ 'van-doc-nav-fixed': isFixed }">
    <section v-for="group in navs" :key="group.name" class="van-doc-nav__group">
      <h2 class="van-doc-nav__title">{{ group.title }}</h2>
      <div v-for="item in group.items" :key="item.path" class="van-doc-nav__item">
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
    { name: 'guide', title: '指南' },
    { name: 'base', packageName: 'base', title: 'Base' },
    { name: 'element-plus', packageName: 'element-plus', title: 'Element Plus' },
    { name: 'vant', packageName: 'vant', title: 'Vant' },
    { name: 'use', packageName: 'use', title: 'Use' },
  ] as const

  const navs = computed(() => {
    const routes = router
      .getRoutes()
      .filter((route) => route.meta?.type === 'docs')
      .sort((a, b) => a.path.localeCompare(b.path))

    return packageGroups
      .map((group) => ({
        ...group,
        items: routes.filter((route) => {
          if (group.name === 'guide') {
            return route.meta.group === 'guide'
          }

          return route.meta.packageName === group.packageName
        }),
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
  .van-doc-nav {
    position: absolute;
    left: 0;
    top: var(--van-doc-header-top-height);
    bottom: 0;
    z-index: 1;
    min-width: var(--van-doc-nav-width);
    max-width: var(--van-doc-nav-width);
    padding: 8px 0;
    overflow-y: scroll;
    background-color: var(--van-doc-background-2);

    @media (min-width: var(--van-doc-row-max-width)) {
      left: 50%;
      margin-left: calc((var(--van-doc-row-max-width) / 2 * -1));
    }

    &.van-doc-nav-fixed {
      position: fixed;
      top: 0;
    }

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 6px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(69, 90, 100, 0.2);
    }
  }

  .van-doc-nav__group {
    margin-bottom: 16px;
    padding-left: 6px;
  }

  .van-doc-nav__title {
    padding: 24px 0 0 var(--van-doc-padding);
    color: var(--van-doc-text-color-2);
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
  }

  .van-doc-nav__item {
    a {
      display: block;
      margin: 4px 0;
      padding: 6px 0 6px var(--van-doc-padding);
      color: var(--van-doc-text-color-3);
      font-size: 14px;
      line-height: 20px;
      transition: color 0.2s;
    }

    @media (max-width: 1300px) {
      a {
        font-size: 13px;
      }

      &:active {
        font-size: 14px;
      }
    }
  }
</style>
