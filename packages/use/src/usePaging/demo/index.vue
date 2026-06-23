<template>
  <demo-block title="基础用法">
    <ul>
      <li v-for="item in pagingData" :key="item.id">{{ item.name }}</li>
    </ul>
    <div class="demo-actions">
      <button :disabled="pagingStatus.pagingLoading" @click="pagingRefresh()">刷新</button>
      <button :disabled="pagingStatus.pagingLoading || pagingFinished" @click="pagingLoad()">
        {{ pagingFinished ? '没有更多了' : '加载更多' }}
      </button>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { usePaging } from '@vrojs/use'

  interface ListItem {
    id: number
    name: string
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const { pagingData, pagingStatus, pagingFinished, pagingRefresh, pagingLoad } =
    usePaging<ListItem>(
      async ([page, size]) => {
        await sleep(300)

        const total = 23
        const start = (page - 1) * size
        const pagingList = Array.from({ length: Math.min(size, total - start) }, (_, index) => {
          const id = start + index + 1
          return {
            id,
            name: `列表项 ${id}`,
          }
        })

        return {
          pagingList,
          pagingTotal: total,
        }
      },
      {
        initialStatus: {
          pagingSize: 5,
        },
        immediate: true,
      },
    )
</script>

<style lang="scss" scoped>
  .demo-actions {
    display: flex;
    gap: 8px;
  }
</style>
