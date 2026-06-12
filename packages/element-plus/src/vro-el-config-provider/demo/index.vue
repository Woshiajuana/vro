<template>
  <demo-block title="基础用法">
    <vro-el-config-provider :locale="locale">
      <config-content />
    </vro-el-config-provider>
  </demo-block>
</template>

<script setup lang="ts">
  import { defineComponent, h } from 'vue'

  import { useLocale } from '../../locale'

  const locale = {
    el: {
      table: {
        refresh: '重新加载',
      },
    },
  }

  const ConfigContent = defineComponent({
    setup() {
      const { t } = useLocale()

      return () =>
        h('div', { class: 'demo-config-provider' }, [
          h('span', t('table.refresh')),
          h('span', t('table.description', { color: '蓝色' })),
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
