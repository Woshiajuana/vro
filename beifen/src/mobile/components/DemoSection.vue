<template>
  <section class="van-doc-demo-section" :class="demoName">
    <slot />
  </section>
</template>

<script>
  import humps from 'humps'

  export default {
    name: 'DemoSection',

    computed: {
      demoName() {
        const { meta } = this.$route || {}
        if (meta && meta.name) {
          const component = humps.decamelize(name, { separator: '-' })
        }

        return ''
      },
    },
  }
</script>

<style lang="scss">
  .van-doc-demo-section {
    box-sizing: border-box;
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
  }
</style>
