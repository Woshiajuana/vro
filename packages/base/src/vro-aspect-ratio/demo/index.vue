<template>
  <demo-block title="基础用法">
    <vro-aspect-ratio :ratio="16 / 9">
      <div class="demo-aspect-ratio">16:9</div>
    </vro-aspect-ratio>
  </demo-block>
</template>

<style lang="scss" scoped>
  .demo-aspect-ratio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--van-doc-white);
    background: var(--van-doc-blue);
    border-radius: 8px;
  }
</style>
