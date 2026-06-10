<template>
  <div class="vro-demo-block">
    <h2 v-if="title" class="vro-demo-block__title">{{ title }}</h2>
    <div v-if="card" class="vro-demo-block__card">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'DemoBlock',
  })

  defineProps<{
    card?: boolean
    title?: string
  }>()
</script>

<style lang="scss" scoped>
  .vro-demo-block {
    &__title {
      margin: 0;
      padding: 32px 16px 16px;
      color: var(--vro-doc-text-color-4);
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }

    &__card {
      margin: 12px 12px 0;
      overflow: hidden;
      background-color: var(--vro-doc-background-2);
      border-radius: 8px;
    }

    &__title + &__card {
      margin-top: 0;
    }

    &:first-of-type {
      .vro-demo-block__title {
        padding-top: 20px;
      }
    }
  }
</style>
