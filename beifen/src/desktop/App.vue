<template>
  <div class="app">
    <doc-container
      v-if="config"
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
      :has-simulator="hasSimulator"
      :lang-configs="langConfigs"
      :dark-mode-class="darkModeClass"
    >
      <router-view />
    </doc-container>
  </div>
</template>

<script>
  import config from '../config'
  import DocContainer from './components/index.vue'

  export default {
    components: {
      DocContainer,
    },

    data() {
      return {
        hasSimulator: true,
        darkModeClass: config.site.darkModeClass,
      }
    },

    computed: {
      simulator() {
        const path = location.pathname.replace(/\/index(\.html)?/, '/')
        return `${path}mobile.html${location.hash}`
      },

      lang() {
        const { lang } = this.$route.meta
        return lang
      },

      langConfigs() {
        return []
      },

      config() {
        const { locales } = config.site

        if (locales) {
          return locales[this.lang]
        }

        return config.site
      },

      versions() {
        return config.site.versions || null
      },
    },

    watch: {
      // eslint-disable-next-line
    '$route.path'() {
        this.setTitleAndToggleSimulator()
      },

      config: {
        handler(val) {
          if (val) {
            this.setTitleAndToggleSimulator()
          }
        },
        immediate: true,
      },
    },

    mounted() {
      if (this.$route.hash) {
        this.$nextTick(() => {
          const el = document.querySelector(this.$route.hash)
          if (el) {
            el.scrollIntoView()
          }
        })
      }
    },

    methods: {
      setTitleAndToggleSimulator() {
        let { title } = this.config

        const navItems = this.config.nav.reduce((result, nav) => [...result, ...nav.items], [])

        const current = navItems.find((item) => item.path === this.$route.meta.name)

        if (current && current.title) {
          title = current.title + ' - ' + title
        } else if (this.config.description) {
          title += ` - ${this.config.description}`
        }

        document.title = title

        this.hasSimulator = !(
          config.site.hideSimulator ||
          this.config.hideSimulator ||
          (current && current.hideSimulator)
        )
      },
    },
  }
</script>
<style lang="scss">
  @use '../assets/scss/base' as *;
  @use '../assets/scss/highlight' as *;

  .van-doc-intro {
    padding-top: 20px;
    text-align: center;

    p {
      margin-bottom: 20px;
    }
  }
</style>
