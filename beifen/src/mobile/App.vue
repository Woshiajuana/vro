<template>
  <demo-nav />
  <van-button v-show="false" />
  <router-view v-slot="{ Component }">
    <demo-section>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </demo-section>
  </router-view>
</template>

<script>
  import { Button as VanButton } from 'vant'
  import { watch } from 'vue'

  import config from '../config.js'
  import { useCurrentTheme } from '../utils/iframe-sync'
  import DemoNav from './components/DemoNav.vue'

  export default {
    components: { DemoNav, VanButton },

    setup() {
      const theme = useCurrentTheme()

      watch(
        theme,
        (newVal, oldVal) => {
          document.documentElement.classList.remove(`van-doc-theme-${oldVal}`)
          document.documentElement.classList.add(`van-doc-theme-${newVal}`)

          const { darkModeClass, lightModeClass } = config.site
          if (darkModeClass) {
            document.documentElement.classList.toggle(darkModeClass, newVal === 'dark')
          }
          if (lightModeClass) {
            document.documentElement.classList.toggle(lightModeClass, newVal === 'light')
          }
        },
        { immediate: true },
      )
    },
  }
</script>

<style lang="scss">
  @use '../assets/scss/base' as *;

  body {
    min-width: 100vw;
    background-color: inherit;
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
