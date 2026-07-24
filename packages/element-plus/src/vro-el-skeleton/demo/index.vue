<template>
  <demo-block title="基础用法">
    <div class="demo-actions">
      <el-button size="small" @click="setStatus('content')">内容</el-button>
      <el-button size="small" @click="setStatus('loading')">加载</el-button>
      <el-button size="small" @click="setStatus('empty')">空状态</el-button>
      <el-button size="small" @click="setStatus('error')">错误</el-button>
    </div>

    <vro-el-skeleton
      :loading="status === 'loading'"
      :empty="status === 'empty'"
      :error="status === 'error' ? error : undefined"
      :loading-props="{ type: 'spinner', color: '#409eff' }"
      @refresh="setStatus('loading')"
    >
      <div class="demo-content">
        <h4>内容加载完成</h4>
        <p>这里展示真实内容区域。</p>
      </div>
    </vro-el-skeleton>
  </demo-block>

  <demo-block title="加载样式">
    <vro-el-skeleton
      loading
      :loading-props="{ type: 'image', size: 40, color: 'var(--el-color-primary)' }"
      loading-description="正在加载图片资源"
      :min-height="160"
    />
  </demo-block>

  <demo-block title="空状态">
    <vro-el-skeleton
      empty
      empty-description="暂无搜索结果"
      empty-btn-text="重新加载"
      :min-height="160"
      @refresh="setStatus('loading')"
    />
    <vro-el-skeleton empty empty-description="暂无数据" :show-empty-btn="false" :min-height="120" />
  </demo-block>

  <demo-block title="错误状态">
    <vro-el-skeleton
      :error="error"
      error-title="请求异常"
      error-btn-text="重新请求"
      :min-height="160"
      @refresh="setStatus('loading')"
    />
  </demo-block>

  <demo-block title="自定义状态内容">
    <vro-el-skeleton :error="error" :min-height="160">
      <template #error="{ refresh }">
        <div class="demo-state">
          <h4>加载失败</h4>
          <p>网络开了个小差，请稍后重试。</p>
          <el-button type="primary" size="small" @click="refresh">重试</el-button>
        </div>
      </template>
    </vro-el-skeleton>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  type Status = 'content' | 'loading' | 'empty' | 'error'

  const status = ref<Status>('content')
  const error = new Error('请求失败，请稍后重试')

  const setStatus = (value: Status) => {
    status.value = value
  }
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .demo-content {
    padding: 24px;
    color: var(--el-text-color-regular);
    background: var(--el-fill-color-lighter);
    border-radius: 4px;

    h4 {
      margin: 0 0 8px;
      font-size: 16px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  .demo-state {
    text-align: center;

    h4 {
      margin: 0 0 8px;
      color: var(--el-text-color-primary);
      font-size: 16px;
    }

    p {
      margin: 0 0 12px;
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }
  }
</style>
