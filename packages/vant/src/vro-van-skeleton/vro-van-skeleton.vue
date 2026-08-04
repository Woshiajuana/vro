<template>
  <div class="vro-van-skeleton" :style="rootStyle">
    <template v-if="loading">
      <slot name="loading">
        <div class="vro-van-skeleton-state vro-van-skeleton-loading">
          <vro-loading type="spinner" size="32" v-bind="loadingProps" />
          <p class="vro-van-skeleton-description">
            {{ loadingDescription ?? t('skeleton.loadingDescription') }}
          </p>
        </div>
      </slot>
    </template>

    <template v-else-if="error">
      <slot name="error" :error="error" :refresh="handleRefresh">
        <div class="vro-van-skeleton-state">
          <van-empty class="vro-van-skeleton-error" image="error" :description="formatError(error)">
            <van-button
              round
              plain
              size="small"
              class="vro-van-skeleton-button"
              @click="handleErrorRefresh"
            >
              {{ errorBtnText ?? t('skeleton.errorBtnText') }}
            </van-button>
          </van-empty>
        </div>
      </slot>
    </template>

    <template v-else-if="empty">
      <slot name="empty" :refresh="handleRefresh">
        <div class="vro-van-skeleton-state">
          <van-empty
            :description="emptyDescription ?? t('skeleton.emptyDescription')"
            :image="emptyImage"
            :image-size="emptyImageSize"
          >
            <van-button
              v-if="showEmptyBtn"
              round
              plain
              size="small"
              class="vro-van-skeleton-button"
              @click="handleRefresh"
            >
              {{ emptyBtnText ?? t('skeleton.emptyBtnText') }}
            </van-button>
          </van-empty>
        </div>
      </slot>
    </template>

    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
  import { formatMessage } from '@daysnap/utils'
  import { VroLoading } from '@vrojs/base'
  import { Button as VanButton, Empty as VanEmpty } from 'vant'
  import { computed, type HTMLAttributes } from 'vue'

  import { useLocale } from '../locale'
  import { type VroVanSkeletonEmits, vroVanSkeletonProps, type VroVanSkeletonSlots } from './types'

  defineOptions({ name: 'VroVanSkeleton' })

  defineSlots<VroVanSkeletonSlots>()
  const emit = defineEmits<VroVanSkeletonEmits>()
  const props = defineProps(vroVanSkeletonProps)
  const { t } = useLocale()

  const rootStyle = computed<HTMLAttributes['style']>(() => {
    if (props.minHeight === undefined) {
      return undefined
    }

    return {
      '--vro-van-skeleton-min-height':
        typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
    }
  })

  const formatError = (error: unknown) => {
    return props.formatter?.(error) ?? formatMessage(error)
  }

  const handleRefresh = () => {
    emit('refresh')
  }

  const handleErrorRefresh = () => {
    emit('update:error', '')
    handleRefresh()
  }
</script>
