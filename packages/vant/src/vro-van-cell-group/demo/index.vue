<template>
  <demo-block title="基础用法">
    <vro-van-cell-group>
      <vro-van-cell label="单元格" value="内容" />
      <vro-van-cell label="带箭头" value="内容" arrow />
    </vro-van-cell-group>
  </demo-block>

  <demo-block title="分组标题">
    <vro-van-cell-group title="基础信息">
      <vro-van-cell label="姓名" value="张三" />
      <vro-van-cell label="手机号" value="13800138000" />
    </vro-van-cell-group>
  </demo-block>

  <demo-block title="卡片风格">
    <vro-van-cell-group inset title="账户信息">
      <vro-van-cell label="余额" value="¥ 8,888.00" />
      <vro-van-cell label="账单" value="查看" arrow />
    </vro-van-cell-group>
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-cell-group border>
      <template #title>
        <span class="demo-cell-group-title">自定义标题</span>
      </template>
      <vro-van-cell label="通知" value="已开启" />
      <vro-van-cell label="隐私" value="设置" arrow />
    </vro-van-cell-group>
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .demo-cell-group-title {
    color: var(--van-primary-color);
    font-weight: 500;
  }
</style>
