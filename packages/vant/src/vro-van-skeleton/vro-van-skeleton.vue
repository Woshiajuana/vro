<template>
  <div class="vro-van-skeleton">
    <!-- loading -->
    <VanLoading v-if="loading" type="spinner" vertical color="#666" size="24">
      {{ loadingDescription }}
    </VanLoading>

    <!-- error -->
    <VanEmpty
      v-else-if="error"
      class="vro-van-skeleton-error"
      image="error"
      :description="formatter(error)"
    >
      <VanButton
        v-if="errorBtnText"
        round
        plain
        size="small"
        class="vro-van-skeleton-button"
        @click="($emit('refresh'), $emit('update:error', ''))"
      >
        {{ errorBtnText }}
      </VanButton>
    </VanEmpty>

    <!-- empty -->
    <VanEmpty v-else :description="emptyDescription" :image="emptySrc" :image-size="[160, 80]">
      <VanButton
        v-if="emptyBtnText"
        round
        plain
        size="small"
        class="vro-van-skeleton-button"
        @click="$emit('refresh')"
      >
        {{ emptyBtnText }}
      </VanButton>
      <slot name="empty"></slot>
    </VanEmpty>
  </div>
</template>

<script setup lang="ts">
  import { vroVanSkeletonProps } from './types'

  defineOptions({ name: 'VroVanSkeleton' })

  defineProps(vroVanSkeletonProps)
</script>
