<template>
  <div v-show="title" class="demo-nav">
    <button class="demo-nav__back" type="button" aria-label="返回" @click="onBack">
      <svg viewBox="0 0 1000 1000">
        <path fill="currentColor" fill-rule="evenodd" :d="backPath" />
      </svg>
    </button>
    <div class="demo-nav__title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const backPath =
    'M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z'

  const title = computed(() => route.meta.title || '')

  const onBack = () => {
    if (history.length > 1) {
      history.back()
      return
    }

    router.replace('/')
  }
</script>

<style lang="scss" scoped>
  .demo-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background-color: var(--van-doc-background-3);
  }

  .demo-nav__title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
  }

  .demo-nav__back {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    padding: 0;
    color: #969799;
    background: transparent;
    border: 0;
    cursor: pointer;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
