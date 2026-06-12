<template>
  <demo-block title="基础用法">
    <vro-el-with-config :el-config-props="{ size: 'large' }">
      <el-button>默认插槽按钮</el-button>
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
</script>
