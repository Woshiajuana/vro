<template>
  <demo-block title="基础用法">
    <vro-van-with-config :vro-config-props="{ locale: en }">
      <locale-text />
    </vro-van-with-config>
  </demo-block>

  <demo-block title="动态组件">
    <vro-van-with-config :is="LocaleText" :vro-config-props="{ locale: en }" />
  </demo-block>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'

  import { useLocale } from '../../locale'
  import en from '../../locale/lang/en'

  const LocaleText = defineComponent({
    name: 'LocaleText',
    setup() {
      const { t } = useLocale()

      return () => t('picker.emptyText')
    },
  })
</script>
