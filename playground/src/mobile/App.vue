<template>
  <DemoNav />
  <RouterView v-slot="{ Component }">
    <DemoSection>
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </DemoSection>
  </RouterView>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  import DemoNav from './components/DemoNav.vue'
  import DemoSection from './components/DemoSection.vue'

  onMounted(() => {
    document.documentElement.classList.add('van-doc-theme-light')
  })
</script>

<style lang="scss">
  @use '../assets/scss/base.scss' as *;

  html,
  body {
    min-width: 100vw;
    background-color: inherit;
  }

  body {
    overflow-x: hidden;
  }

  .van-doc-theme-light {
    background-color: var(--van-doc-gray-1);
  }

  .van-doc-theme-dark {
    background-color: var(--van-doc-black);
  }

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
</style>
