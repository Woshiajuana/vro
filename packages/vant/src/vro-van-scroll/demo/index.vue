<template>
  <demo-block title="基础用法">
    <div class="demo-scroll">
      <vro-van-scroll :finished="basicFinished" @load="loadBasic" @refresh="refreshBasic">
        <div v-for="item in basicList" :key="item" class="demo-scroll-item">
          列表内容 {{ item }}
        </div>
      </vro-van-scroll>
    </div>
  </demo-block>

  <demo-block title="加载错误">
    <div class="demo-scroll">
      <vro-van-scroll immediate-check :finished="errorFinished" @load="loadError" @refresh="refreshError">
        <div v-for="item in errorList" :key="item" class="demo-scroll-item">
          错误重试 {{ item }}
        </div>
      </vro-van-scroll>
    </div>
  </demo-block>

  <demo-block title="自定义文案">
    <div class="demo-scroll">
      <vro-van-scroll
        finished
        finished-text="已经到底了"
        loading-text="努力加载中"
        loosing-text="松开刷新"
        pulling-text="继续下拉"
        success-text="刷新完成"
      >
        <div v-for="item in 3" :key="item" class="demo-scroll-item">自定义文案 {{ item }}</div>
      </vro-van-scroll>
    </div>
  </demo-block>

  <demo-block title="禁用刷新和加载">
    <div class="demo-scroll">
      <vro-van-scroll load-disabled refresh-disabled>
        <div v-for="item in 3" :key="item" class="demo-scroll-item">静态内容 {{ item }}</div>
      </vro-van-scroll>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  import type { VroVanScrollDone } from '..'

  const basicList = ref([1, 2, 3, 4, 5])
  const errorList = ref([1, 2, 3])
  const errorLoaded = ref(false)

  const basicFinished = computed(() => basicList.value.length >= 15)
  const errorFinished = computed(() => errorList.value.length >= 8)

  const refreshBasic = (done: VroVanScrollDone) => {
    setTimeout(() => {
      basicList.value = [1, 2, 3, 4, 5]
      done()
    }, 500)
  }

  const loadBasic = (done: VroVanScrollDone) => {
    setTimeout(() => {
      const start = basicList.value.length + 1
      basicList.value.push(...Array.from({ length: 5 }, (_, index) => start + index))
      done()
    }, 500)
  }

  const refreshError = (done: VroVanScrollDone) => {
    setTimeout(() => {
      errorLoaded.value = false
      errorList.value = [1, 2, 3]
      done()
    }, 500)
  }

  const loadError = (done: VroVanScrollDone) => {
    setTimeout(() => {
      if (!errorLoaded.value) {
        errorLoaded.value = true
        done('网络异常')
        return
      }

      const start = errorList.value.length + 1
      errorList.value.push(...Array.from({ length: 5 }, (_, index) => start + index))
      done()
    }, 500)
  }
</script>

<style lang="scss" scoped>
  .demo-scroll {
    height: 260px;
    overflow: hidden;
    background: var(--van-background-2);
  }

  .demo-scroll-item {
    padding: 14px 16px;
    color: var(--van-text-color);
    background: var(--van-background-2);
    border-bottom: 1px solid var(--van-border-color);
  }
</style>
