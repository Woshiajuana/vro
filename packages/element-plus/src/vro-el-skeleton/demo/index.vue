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
      loading-type="spinner"
      loading-color="#409eff"
      @refresh="setStatus('loading')"
    >
      <div class="demo-content">
        <h4>内容加载完成</h4>
        <p>这里展示真实内容区域。</p>
      </div>
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
</style>
