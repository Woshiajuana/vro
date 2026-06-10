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
  import DemoNav from './components/DemoNav.vue'
  import DemoSection from './components/DemoSection.vue'
</script>

<style lang="scss">
  @use '@/assets/scss/global.scss' as *;

  html,
  body {
    min-width: 100vw;
    background-color: var(--bg-color-2);
  }

  body {
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
</style>
