<template>
  <demo-block title="基础用法">
    <vro-el-divider />
  </demo-block>

  <demo-block title="内容">
    <vro-el-divider content="分割线内容" />
  </demo-block>

  <demo-block title="内容位置">
    <vro-el-divider content="左侧内容" content-position="left" />
    <vro-el-divider content="居中内容" content-position="center" />
    <vro-el-divider content="右侧内容" content-position="right" />
  </demo-block>

  <demo-block title="虚线">
    <vro-el-divider content="虚线" border-style="dashed" />
  </demo-block>

  <demo-block title="垂直分割线">
    <div class="demo-divider-vertical">
      <span>文案一</span>
      <vro-el-divider direction="vertical" />
      <span>文案二</span>
      <vro-el-divider direction="vertical" />
      <span>文案三</span>
    </div>
  </demo-block>

  <demo-block title="自定义内容">
    <vro-el-divider>
      <span class="demo-divider-content">默认插槽内容</span>
    </vro-el-divider>
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .demo-divider-vertical {
    display: flex;
    align-items: center;
  }

  .demo-divider-content {
    color: var(--el-color-primary);
  }
</style>
