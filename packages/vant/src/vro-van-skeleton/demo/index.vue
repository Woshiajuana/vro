<template>
  <demo-block title="加载状态">
    <vro-van-skeleton loading loading-description="正在加载数据" />
  </demo-block>

  <demo-block title="错误状态">
    <vro-van-skeleton
      :error="error"
      error-btn-text="重新加载"
      :formatter="formatError"
      @refresh="handleRefresh"
      @update:error="error = $event"
    />
  </demo-block>

  <demo-block title="空状态">
    <vro-van-skeleton
      empty-description="暂无订单"
      empty-btn-text="去刷新"
      @refresh="handleRefresh"
    />
  </demo-block>

  <demo-block title="隐藏空状态按钮">
    <vro-van-skeleton empty-description="暂无消息" :show-empty-btn="false" />
  </demo-block>

  <demo-block title="正常内容">
    <vro-van-skeleton :empty="false" :loading="false">
      <div class="demo-skeleton-content">
        <strong>订单列表</strong>
        <span>这里展示接口返回后的真实内容。</span>
      </div>
    </vro-van-skeleton>
  </demo-block>

  <demo-block title="自定义状态">
    <vro-van-skeleton :error="error" min-height="160px" @refresh="handleRefresh">
      <template #error="{ refresh }">
        <div class="demo-skeleton-custom">
          <strong>网络不太稳定</strong>
          <span>可以稍后再试一次。</span>
          <van-button round size="small" type="primary" @click="refresh">重试</van-button>
        </div>
      </template>
    </vro-van-skeleton>
  </demo-block>
</template>

<script setup lang="ts">
  import { Button as VanButton } from 'vant'
  import { ref } from 'vue'

  const error = ref<unknown>(new Error('请求失败，请稍后再试'))

  const formatError = (err: unknown) => {
    return err instanceof Error ? err.message : `${err}`
  }

  const handleRefresh = () => {
    error.value = new Error('请求失败，请稍后再试')
  }
</script>

<style lang="scss" scoped>
  .demo-skeleton-content,
  .demo-skeleton-custom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    color: var(--van-text-color);
  }

  .demo-skeleton-custom {
    min-height: 160px;
    color: var(--van-text-color-2);

    strong {
      color: var(--van-text-color);
    }
  }
</style>
