<template>
  <div v-loading="loading" class="vro-el-skeleton">
    <el-result v-if="error" icon="error" title="哦嗬！出错了哦~" :sub-title="formatMessage(error)">
      <template #extra>
        <el-button type="primary" @click="$emit('refresh')">刷新</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
  import { formatMessage } from '@daysnap/utils'
  import { ElButton, ElResult } from 'element-plus'

  import { vroElSkeletonProps } from './types'

  defineEmits(['refresh'])

  defineOptions({ name: 'VroElSkeleton' })

  defineProps(vroElSkeletonProps)
</script>
