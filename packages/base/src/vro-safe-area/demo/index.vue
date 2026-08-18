<template>
  <demo-block title="基础用法">
    <vro-safe-area class="demo-safe-area"> 内容区域 </vro-safe-area>
  </demo-block>

  <demo-block title="顶部安全区">
    <vro-safe-area top class="demo-safe-area"> 顶部安全区 </vro-safe-area>
  </demo-block>

  <demo-block title="底部安全区">
    <vro-safe-area bottom class="demo-safe-area"> 底部安全区 </vro-safe-area>
  </demo-block>

  <demo-block title="左右安全区">
    <vro-safe-area left right class="demo-safe-area"> 左右安全区 </vro-safe-area>
  </demo-block>

  <demo-block title="组合使用">
    <vro-safe-area top bottom left right class="demo-safe-area"> 四向安全区 </vro-safe-area>
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .demo-safe-area {
    --vro-safe-area-padding-top: 12px;
    --vro-safe-area-padding-right: 12px;
    --vro-safe-area-padding-bottom: 12px;
    --vro-safe-area-padding-left: 12px;

    margin: 0 16px;
    color: #323233;
    font-size: 14px;
    background: #f7f8fa;
    border: 1px solid #ebedf0;
    border-radius: 4px;
  }
</style>
