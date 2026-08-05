<template>
  <van-pull-refresh
    v-model="refreshing"
    class="vro-van-scroll"
    :pulling-text="pullingText || t('scroll.pullingText')"
    :loosing-text="loosingText || t('scroll.loosingText')"
    :loading-text="loadingText || t('scroll.loadingText')"
    :success-text="refreshErrorText || successText || t('scroll.successText')"
    :disabled="pullDisabled"
    :success-duration="successDuration"
    @refresh="handleRefresh"
  >
    <van-list
      v-model:loading="loading"
      v-model:error="loadError"
      class="vro-van-scroll-list"
      :error-text="loadErrorText"
      :offset="offset"
      :loading-text="loadingText || t('scroll.loadingText')"
      :finished-text="finishedText || t('scroll.finishedText')"
      :disabled="listDisabled"
      :finished="finished"
      :immediate-check="false"
      @load="handleLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { useLocale } from '../locale'
  import {
    type VroVanScrollDone,
    type VroVanScrollEmits,
    vroVanScrollProps,
    type VroVanScrollSlots,
  } from './types'

  defineOptions({ name: 'VroVanScroll' })
  defineSlots<VroVanScrollSlots>()
  const emit = defineEmits<VroVanScrollEmits>()
  defineProps(vroVanScrollProps)

  const { t } = useLocale()

  const refreshing = ref(false)
  const refreshErrorText = ref('')
  const loading = ref(false)
  const loadError = ref(false)
  const loadErrorText = ref('')

  const handleRefresh = () => {
    const done: VroVanScrollDone = (error) => {
      refreshErrorText.value = error || ''
      refreshing.value = false

      loadError.value = false
      loadErrorText.value = ''
    }

    emit('refresh', done)
  }

  const handleLoad = () => {
    const done: VroVanScrollDone = (error) => {
      loadError.value = !!error
      loadErrorText.value = error ? t('scroll.loadErrorText', { error }) : ''
      loading.value = false
    }

    emit('load', done)
  }
</script>
