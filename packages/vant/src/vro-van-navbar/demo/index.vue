<template>
  <demo-block title="基础用法">
    <vro-van-navbar title="标题" @click-left="handleClickLeft" />
  </demo-block>

  <demo-block title="左右文本">
    <vro-van-navbar
      title="订单详情"
      left-text="返回"
      right-text="更多"
      @click-left="handleClickLeft"
      @click-right="handleClickRight"
    />
  </demo-block>

  <demo-block title="自定义内容">
    <vro-van-navbar title="消息">
      <template #left>
        <span class="demo-navbar-link">关闭</span>
      </template>
      <template #right>
        <span class="demo-navbar-link">保存</span>
      </template>
    </vro-van-navbar>
  </demo-block>

  <demo-block title="无返回箭头">
    <vro-van-navbar title="个人中心" :left-arrow="false" right-text="设置" />
  </demo-block>

  <demo-block title="无边框">
    <vro-van-navbar title="无边框" :border="false" />
  </demo-block>
</template>

<script setup lang="ts">
  import { showToast } from 'vant'

  const handleClickLeft = () => {
    showToast('点击左侧')
  }

  const handleClickRight = () => {
    showToast('点击右侧')
  }
</script>

<style lang="scss" scoped>
  .demo-navbar-link {
    color: var(--van-primary-color);
    font-size: 14px;
  }
</style>
