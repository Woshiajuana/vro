<template>
  <RouterLink class="vro-doc-nav-link" :class="{ active }" :to="item.path">
    {{ item.meta?.title }}
  </RouterLink>
</template>

<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue'
  import type { RouteRecordNormalized } from 'vue-router'
  import { useRoute } from 'vue-router'

  const props = defineProps<{
    item: RouteRecordNormalized
  }>()

  const route = useRoute()
  const active = computed(() => route.path === props.item.path)

  watch(
    active,
    (value) => {
      if (value) {
        nextTick(() => {
          document.querySelector('.vro-doc-nav-link.active')?.scrollIntoView({
            block: 'nearest',
          })
        })
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .vro-doc-nav-link {
    display: block;
    padding: 6px 0 6px var(--vro-doc-padding);
    color: var(--vro-doc-text-color-3);
    font-size: 14px;
    line-height: 20px;
    transition: color 0.2s;

    &:hover,
    &.active {
      color: var(--vro-doc-link-color);
    }

    &.active {
      font-weight: 600;
    }
  }
</style>
