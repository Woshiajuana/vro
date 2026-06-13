<template>
  <demo-block title="基础用法">
    <div class="demo-loading-row">
      <vro-loading text="加载中..." />
    </div>
  </demo-block>

  <demo-block title="加载类型">
    <div class="demo-loading-row">
      <vro-loading type="circular" />
      <vro-loading type="spinner" />
      <vro-loading type="dots" />
    </div>
  </demo-block>

  <demo-block title="自定义样式">
    <div class="demo-loading-row">
      <vro-loading type="spinner" color="#409eff" :size="40" text="请稍候" vertical />
      <vro-loading type="dots" color="#67c23a" :size="36" text-color="#303133">
        正在处理
      </vro-loading>
    </div>
  </demo-block>
</template>

<style lang="scss" scoped>
  .demo-loading-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;
    min-height: 72px;
  }
</style>
