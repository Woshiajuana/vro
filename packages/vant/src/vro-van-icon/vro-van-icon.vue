<template>
  <vro-icon v-bind="resolved" class="vro-van-icon">
    <slot></slot>
  </vro-icon>
</template>

<script setup lang="ts">
  import { VroIcon } from '@vrojs/base'
  import { computed } from 'vue'

  import { vroVanIconProps } from './types'

  defineOptions({ name: 'VroVanIcon' })

  const props = defineProps(vroVanIconProps)

  const resolved = computed(() => {
    const { name, fontFamily, ...rest } = props
    return {
      ...rest,
      name,
      fontFamily:
        fontFamily === 'iconfont' && name?.startsWith('van-icon-') ? 'is-van-icon' : fontFamily,
    }
  })
</script>
