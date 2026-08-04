<template>
  <van-pull-refresh class="vro-van-scroll" :disabled="!refresh" @refresh="handleRefresh">
    <van-list :disabled="!load" @load="handleLoad">
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { vroVanScrollProps } from './types'

  defineOptions({ name: 'VroVanScroll' })

  defineProps(vroVanScrollProps)

  const refreshing = ref(false)
  const loading = ref(false)

  const handleRefresh = async () => {
    //
  }

  const handleLoad = async () => {
    //
  }
</script>
