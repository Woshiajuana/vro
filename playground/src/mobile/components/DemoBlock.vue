<template>
  <div class="van-doc-demo-block">
    <h2 v-if="title" class="van-doc-demo-block__title">{{ title }}</h2>
    <div v-if="card" class="van-doc-demo-block__card">
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
  .van-doc-demo-block {
    &__title {
      margin: 0;
      padding: 32px 16px 16px;
      font-weight: 400;
      color: var(--van-doc-text-color-4);
      font-size: 14px;
      line-height: 16px;
    }

    &__card {
      margin: 12px 12px 0;
      overflow: hidden;
      border-radius: 8px;
    }

    &__title + &__card {
      margin-top: 0;
    }

    &:first-of-type {
      .van-doc-demo-block__title {
        padding-top: 20px;
      }
    }
  }
</style>
