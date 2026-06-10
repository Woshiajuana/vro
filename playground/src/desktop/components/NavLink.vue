<template>
  <RouterLink class="van-doc-nav-link" :class="{ active }" :to="item.path">
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
          document.querySelector('.van-doc-nav-link.active')?.scrollIntoView({
            block: 'nearest',
          })
        })
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .van-doc-nav-link {
    &:hover,
    &.active {
      color: var(--van-doc-link-color);
    }

    &.active {
      font-weight: 600;
    }
  }
</style>
