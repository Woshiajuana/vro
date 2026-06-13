<template>
  <div class="vro-el-skeleton" :style="rootStyle">
    <template v-if="loading">
      <slot name="loading">
        <div class="vro-el-skeleton__state vro-el-skeleton__loading">
          <el-skeleton :animated="animated" :rows="rows" />
          <p class="vro-el-skeleton__description">
            {{ loadingDescription ?? t('skeleton.loadingDescription') }}
          </p>
        </div>
      </slot>
    </template>

    <template v-else-if="error">
      <slot name="error" :error="error" :refresh="handleRefresh">
        <div class="vro-el-skeleton__state">
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
        <div class="vro-el-skeleton__state">
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
  import { ElButton, ElEmpty, ElResult, ElSkeleton } from 'element-plus'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { vroElSkeletonProps } from './types'

  const emit = defineEmits<{
    (event: 'refresh'): void
  }>()

  defineOptions({ name: 'VroElSkeleton' })

  const props = defineProps(vroElSkeletonProps)
  const { t } = useLocale()

  const rootStyle = computed(() => ({
    minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
  }))

  const handleRefresh = () => {
    emit('refresh')
  }
</script>
