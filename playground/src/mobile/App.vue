<template>
  <ElConfigProvider :locale="zhCn">
    <DemoNav />
    <RouterView v-slot="{ Component }">
      <DemoSection>
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </DemoSection>
    </RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import { watch } from 'vue'

  import { useCurrentTheme } from '@/utils'

  import DemoNav from './components/DemoNav.vue'
  import DemoSection from './components/DemoSection.vue'

  const theme = useCurrentTheme()

  watch(
    theme,
    (newVal, oldVal) => {
      if (oldVal) {
        document.documentElement.classList.remove(`van-doc-theme-${oldVal}`)
      }
      document.documentElement.classList.add(`van-doc-theme-${newVal}`)
    },
    { immediate: true },
  )
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
