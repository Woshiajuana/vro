<template>
  <demo-block title="基础用法">
    <vro-el-with-config :el-config-props="{ size: 'large' }" :vro-config-props="{ locale }">
      <el-button>默认插槽按钮</el-button>
      <config-content />
    </vro-el-with-config>
  </demo-block>

  <demo-block title="动态组件">
    <vro-el-with-config :is="ElButton" :el-config-props="{ size: 'small' }" type="primary">
      动态按钮
    </vro-el-with-config>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
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

      return () => h('div', { class: 'demo-with-config' }, t('table.refresh'))
    },
  })
</script>

<style lang="scss" scoped>
  .demo-with-config {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
