<template>
  <demo-block title="基础用法">
    <div class="demo-view-phone">
      <vro-van-view title="页面标题" @click-left="handleClickLeft">
        <div class="demo-view-content">
          <p v-for="item in list" :key="item">页面内容 {{ item }}</p>
        </div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="导航栏属性">
    <div class="demo-view-phone">
      <vro-van-view
        title="详情页"
        :navbar-props="{
          leftText: '返回',
          rightText: '保存',
        }"
        @click-left="handleClickLeft"
        @click-right="handleClickRight"
      >
        <div class="demo-view-content">通过 navbarProps 透传 VroVanNavbar 属性</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="隐藏导航栏">
    <div class="demo-view-phone">
      <vro-van-view :show-navbar="false">
        <div class="demo-view-content">页面不展示默认导航栏</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="自定义导航栏插槽">
    <div class="demo-view-phone">
      <vro-van-view @click-left="handleClickLeft" @click-right="handleClickRight">
        <template #left>
          <span>取消</span>
        </template>
        <template #title>
          <span class="demo-view-title">编辑资料</span>
        </template>
        <template #right>
          <span>保存</span>
        </template>
        <div class="demo-view-content">插槽内容</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="自定义导航栏内容">
    <div class="demo-view-phone">
      <vro-van-view>
        <template #navbar>
          <div class="demo-view-navbar-content">
            <span>消息</span>
            <span class="demo-view-navbar-badge">12</span>
          </div>
        </template>
        <div class="demo-view-content">navbar 插槽会覆盖默认标题区域</div>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="自定义头部和底部">
    <div class="demo-view-phone">
      <vro-van-view>
        <template #header>
          <div class="demo-view-header">自定义头部</div>
        </template>
        <div class="demo-view-content">
          <p>主体内容</p>
          <p>header 插槽会覆盖默认导航栏</p>
        </div>
        <template #footer>
          <div class="demo-view-footer">底部操作区</div>
        </template>
      </vro-van-view>
    </div>
  </demo-block>

  <demo-block title="禁止内容滚动">
    <div class="demo-view-phone">
      <vro-van-view title="固定内容" :scrollable="false">
        <div class="demo-view-content">
          <p v-for="item in list" :key="item">内容区不设置滚动 {{ item }}</p>
        </div>
      </vro-van-view>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { showToast } from 'vant'

  const list = Array.from({ length: 8 }, (_, index) => index + 1)

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

    p {
      margin: 0 0 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .demo-view-title {
    color: var(--van-text-color);
    font-weight: 600;
  }

  .demo-view-navbar-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    color: var(--van-text-color);
    font-size: 15px;
    font-weight: 600;
  }

  .demo-view-navbar-badge {
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    box-sizing: border-box;
    color: var(--van-white);
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    background: var(--van-danger-color);
    border-radius: 9px;
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
