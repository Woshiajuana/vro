<template>
  <demo-block title="基础用法">
    <div class="demo-circle-progress-row">
      <vro-circle-progress :model-value="progress" />
    </div>
  </demo-block>

  <demo-block title="自定义样式">
    <div class="demo-circle-progress-row">
      <vro-circle-progress :model-value="68" color="#1989fa" background-color="#ebedf0" />
      <vro-circle-progress :model-value="68" :size="80" :stroke-width="1" color="#07c160" />
      <vro-circle-progress :model-value="68" :size="120" :stroke-width="12" color="#ee0a24" />
    </div>
  </demo-block>

  <demo-block title="端点样式">
    <div class="demo-circle-progress-row">
      <vro-circle-progress :model-value="68" stroke-linecap="butt" />
      <vro-circle-progress :model-value="68" stroke-linecap="round" />
      <vro-circle-progress :model-value="68" stroke-linecap="square" />
    </div>
  </demo-block>

  <demo-block title="动画配置">
    <div class="demo-circle-progress-row">
      <vro-circle-progress :model-value="progress" :duration="1000" curve="linear" />
      <vro-circle-progress :model-value="progress" duration="1.2s" curve="ease-in-out" />
    </div>
  </demo-block>

  <demo-block title="倒计时动画">
    <div class="demo-circle-progress-row">
      <vro-circle-progress
        :model-value="countdownProgress"
        :duration="countdownDuration"
        curve="cubic-bezier(0, 0, 0.2, 1)"
        color="#1989fa"
        stroke-linecap="butt"
      />
      <button class="demo-circle-progress-button" @click="startCountdown">开始1</button>
    </div>
  </demo-block>

  <demo-block title="自定义内容">
    <div class="demo-circle-progress-row">
      <vro-circle-progress :model-value="86" color="#ff976a">
        <strong>86</strong>
      </vro-circle-progress>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, ref } from 'vue'

  import { useVroCircleProgress } from '../useVroCircleProgress'

  const progress = ref(20)
  const {
    progress: countdownProgress,
    duration: countdownDuration,
    start: startCountdown,
  } = useVroCircleProgress()

  const timer = window.setInterval(() => {
    progress.value = progress.value >= 90 ? 20 : progress.value + 10
  }, 1200)

  onBeforeUnmount(() => {
    window.clearInterval(timer)
  })
</script>

<style lang="scss" scoped>
  .demo-circle-progress-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    padding: 0 16px;
  }

  .demo-circle-progress-button {
    height: 32px;
    padding: 0 14px;
    color: #fff;
    font-size: 14px;
    background: #1989fa;
    border: 0;
    border-radius: 4px;
  }
</style>
