<template>
  <div v-show="title" class="demo-nav">
    <button class="demo-nav__back" type="button" aria-label="返回" @click="onBack">
      <svg viewBox="0 0 1000 1000">
        <path fill="currentColor" fill-rule="evenodd" :d="backPath" />
      </svg>
    </button>
    <div class="demo-nav__title">{{ title }}</div>
    <button
      v-if="isOpenShow"
      class="demo-nav__open"
      type="button"
      aria-label="新窗口打开"
      @click="openDemo"
    >
      <svg viewBox="0 0 1024 1024">
        <path fill="currentColor" :d="openPath" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const backPath =
    'M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z'
  const openPath =
    'M810.667 554.667a42.667 42.667 0 0 1 85.333 0v213.333A128 128 0 0 1 768 896H256A128 128 0 0 1 128 768V256A128 128 0 0 1 256 128h213.333a42.667 42.667 0 0 1 0 85.333H256A42.667 42.667 0 0 0 213.333 256v512A42.667 42.667 0 0 0 256 810.667h512A42.667 42.667 0 0 0 810.667 768V554.667zM597.333 213.333a42.667 42.667 0 0 1 0-85.333h256A42.667 42.667 0 0 1 896 170.667v256a42.667 42.667 0 0 1-85.333 0V273.664L542.165 542.165a42.667 42.667 0 0 1-60.33-60.33l268.501-268.502H597.333z'

  const title = computed(() => route.meta.title || '')

  const isOpenShow = window.top !== window.self

  const onBack = () => {
    if (history.length > 1) {
      history.back()
      return
    }

    router.replace('/')
  }

  const openDemo = () => {
    window.open(location.href, '_blank', 'noopener,noreferrer')
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

  .demo-nav__back,
  .demo-nav__open {
    position: absolute;
    top: 16px;
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

  .demo-nav__back {
    left: 16px;
  }

  .demo-nav__open {
    right: 16px;
  }
</style>
