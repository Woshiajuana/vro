<template>
  <div class="demo-block">
    <h2 v-if="title" class="demo-block__title">{{ title }}</h2>
    <div v-if="card" class="demo-block__card">
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
  .demo-block {
    &__title {
      margin: 0;
      padding: 32px 16px 16px;
      color: var(--text-color-4);
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }

    &__card {
      margin: 12px 12px 0;
      overflow: hidden;
      background-color: var(--bg-color);
      border-radius: 8px;
    }

    &__title + &__card {
      margin-top: 0;
    }

    &:first-of-type {
      .demo-block__title {
        padding-top: 20px;
      }
    }
  }
</style>
