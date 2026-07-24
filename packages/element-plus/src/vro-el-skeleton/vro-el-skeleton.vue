<template>
  <div class="vro-el-skeleton" :style="rootStyle">
    <template v-if="loading">
      <slot name="loading">
        <div class="vro-el-skeleton-state vro-el-skeleton-loading">
          <vro-loading type="circular" size="32" v-bind="loadingProps" />
          <p class="vro-el-skeleton-description">
            {{ loadingDescription ?? t('skeleton.loadingDescription') }}
          </p>
        </div>
      </slot>
    </template>

    <template v-else-if="error">
      <slot name="error" :error="error" :refresh="handleRefresh">
        <div class="vro-el-skeleton-state">
          <el-result
            icon="error"
            :title="errorTitle ?? t('skeleton.errorTitle')"
            :sub-title="formatMessage(error)"
          >
            <template #extra>
              <el-button type="primary" @click="handleRefresh">
                {{ errorBtnText ?? t('skeleton.errorBtnText') }}
              </el-button>
            </template>
          </el-result>
        </div>
      </slot>
    </template>

    <template v-else-if="empty">
      <slot name="empty" :refresh="handleRefresh">
        <div class="vro-el-skeleton-state">
          <el-empty :description="emptyDescription ?? t('skeleton.emptyDescription')">
            <el-button v-if="showEmptyBtn" type="primary" @click="handleRefresh">
              {{ emptyBtnText ?? t('skeleton.emptyBtnText') }}
            </el-button>
          </el-empty>
        </div>
      </slot>
    </template>

    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
  import { formatMessage } from '@daysnap/utils'
  import { VroLoading } from '@vrojs/base'
  import { ElButton, ElEmpty, ElResult } from 'element-plus'
  import { computed, type HTMLAttributes } from 'vue'

  import { useLocale } from '../locale'
  import { type VroElSkeletonEmits, vroElSkeletonProps, type VroElSkeletonSlots } from './types'

  const emit = defineEmits<VroElSkeletonEmits>()
  defineSlots<VroElSkeletonSlots>()

  defineOptions({ name: 'VroElSkeleton' })

  const props = defineProps(vroElSkeletonProps)
  const { t } = useLocale()

  const rootStyle = computed<HTMLAttributes['style']>(() => {
    if (props.minHeight === undefined) {
      return undefined
    }

    return {
      '--vro-el-skeleton-min-height':
        typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
    }
  })

  const handleRefresh = () => {
    emit('refresh')
  }
</script>
