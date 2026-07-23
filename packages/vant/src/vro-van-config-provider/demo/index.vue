<template>
  <demo-block title="基础用法">
    <vro-van-config-provider :locale="locale">
      <config-content />
    </vro-van-config-provider>
  </demo-block>
</template>

<script setup lang="ts">
  import { defineComponent, h } from 'vue'

  import { useLocale } from '../../locale'

  const locale = {
    van: {
      picker: {
        filterPlaceholder: '请输入筛选内容',
      },
    },
  }

  const ConfigContent = defineComponent({
    setup() {
      const { t } = useLocale()

      return () =>
        h('div', { class: 'demo-config-provider' }, [h('span', t('picker.filterPlaceholder'))])
    },
  })
</script>

<style lang="scss" scoped>
  .demo-config-provider {
    display: flex;
    gap: 8px;
  }
</style>
