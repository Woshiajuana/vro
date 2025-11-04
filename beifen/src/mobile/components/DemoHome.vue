<template>
  <div class="demo-home">
    <h1 class="demo-home__title" :class="{ 'demo-home__title--small': smallTitle }">
      <img :src="config.logo" />
      <span>{{ config.title }}</span>
    </h1>
    <h2 v-if="config.description" class="demo-home__desc">
      {{ config.description }}
    </h2>
    <demo-home-nav v-for="(group, index) in navs" :key="index" :group="group" />
  </div>
</template>

<script>
  import config from '../../config'
  import DemoHomeNav from './DemoHomeNav.vue'

  export default {
    components: {
      DemoHomeNav,
    },

    computed: {
      navs() {
        return this.$router.getRoutes().reduce((result, route) => {
          const { path, meta } = route
          const { name, group: groupName, sort } = meta
          let group = result.find((item) => item.name === groupName)
          if (!group) {
            group = {
              sort,
              title: config.keyToText(`${groupName}.__name`) || groupName,
              name: groupName,
              items: [],
            }
            result.push(group)
          }
          if (name) {
            group.items.push({
              path,
              name,
              title: config.keyToText(`${group.name}.${name}`) || name,
            })
          }
          return result
        }, [])
      },
      config() {
        return config.site
      },
      smallTitle() {
        return this.config.title.length >= 8
      },
    },
  }
</script>

<style lang="scss">
  .demo-home {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 46px 20px 20px;

    &__title,
    &__desc {
      padding-left: 16px;
      font-weight: normal;
      line-height: 1;
      user-select: none;
    }

    &__title {
      margin: 0 0 16px;
      font-size: 32px;

      img,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      img {
        width: 32px;
      }

      span {
        margin-left: 16px;
      }

      &--small {
        font-size: 24px;
      }
    }

    &__desc {
      margin: 0 0 40px;
      color: var(--van-doc-text-color-4);
      font-size: 14px;
      line-height: 1.6;
    }
  }
</style>
