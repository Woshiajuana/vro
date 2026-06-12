<template>
  <demo-block title="基础用法">
    <vro-el-config-provider :locale="locale">
      <config-content />
    </vro-el-config-provider>
  </demo-block>
</template>

<script setup lang="ts">
  import { defineComponent, h } from 'vue'

  import { useVroElConfig } from '../useVroElConfig'

  const locale = {
    schemaFilter: {
      query: '搜索',
      reset: '清空',
    },
  }

  const ConfigContent = defineComponent({
    setup() {
      const config = useVroElConfig()

      return () =>
        h('div', { class: 'demo-config-provider' }, [
          h('span', config.locale.schemaFilter.query),
          h('span', config.locale.schemaFilter.reset),
        ])
    },
  })
</script>

<style lang="scss" scoped>
  .demo-config-provider {
    display: flex;
    gap: 8px;
  }
</style>
