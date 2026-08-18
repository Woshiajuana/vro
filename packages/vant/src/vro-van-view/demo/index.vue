<template>
  <demo-block title="基础用法">
    <div class="demo-view-phone">
      <vro-van-view :navbar-props="{ title: '页面标题' }" @click-left="handleClickLeft">
        <div class="demo-view-content">页面内容</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="隐藏导航栏">
    <div class="demo-view-phone">
      <vro-van-view :show-navbar="false">
        <div class="demo-view-content">自定义页面头部场景</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="自定义导航栏插槽">
    <div class="demo-view-phone">
      <vro-van-view :navbar-props="{ rightText: '保存' }" @click-right="handleClickRight">
        <template #title>
          <span class="demo-view-title">编辑资料</span>
        </template>
        <div class="demo-view-content">插槽内容</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="自定义头部和底部">
    <div class="demo-view-phone">
      <vro-van-view safe-area-inset-bottom>
        <template #header>
          <div class="demo-view-header">自定义头部</div>
        </template>
        <div class="demo-view-content">主体内容</div>
        <template #footer>
          <div class="demo-view-footer">底部操作区</div>
        </template>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="禁止内容滚动">
    <div class="demo-view-phone">
      <vro-van-view :navbar-props="{ title: '固定内容' }" :scrollable="false">
        <div class="demo-view-content">内容区不设置滚动</div>
      </vro-van-view>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { showToast } from 'vant'

  const handleClickLeft = () => {
    showToast('点击返回')
  }

  const handleClickRight = () => {
    showToast('点击保存')
  }
</script>

<style lang="scss" scoped>
  .demo-view-phone {
    height: 240px;
    overflow: hidden;
    background: var(--van-background);
    border: 1px solid var(--van-border-color);
  }

  .demo-view-content {
    padding: 16px;
    color: var(--van-text-color-2);
    font-size: 14px;
  }

  .demo-view-title {
    color: var(--van-text-color);
    font-weight: 600;
  }

  .demo-view-header,
  .demo-view-footer {
    padding: 12px 16px;
    color: var(--van-text-color);
    font-size: 14px;
    background: var(--van-background-2);
  }

  .demo-view-footer {
    text-align: center;
  }
</style>
