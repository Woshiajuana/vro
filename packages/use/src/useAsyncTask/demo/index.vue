<template>
  <demo-block title="基础用法">
    <ul>
      <li>状态：{{ loading ? '加载中' : '空闲' }}</li>
      <li>数据：{{ data?.message ?? '-' }}</li>
      <li>错误：{{ error ? formatMessage(error) : '-' }}</li>
      <li class="demo-actions">
        <button :disabled="loading" @click="trigger(false)">加载成功</button>
        <button :disabled="loading" @click="trigger(true)">加载失败</button>
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { formatMessage } from '@daysnap/utils'
  import { useAsyncTask } from '@vrojs/use'

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const { data, error, loading, trigger } = useAsyncTask(
    async (shouldFail: boolean) => {
      await sleep(600)

      if (shouldFail) {
        throw new Error('请求失败')
      }

      return {
        message: `加载完成：${new Date().toLocaleTimeString()}`,
      }
    },
    {
      initialValue: {
        message: '',
      },
    },
  )
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }
</style>
