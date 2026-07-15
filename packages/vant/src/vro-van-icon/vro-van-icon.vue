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
    // eslint-disable-next-line prefer-const
    let { name, fontFamily, ...rest } = props
    if (fontFamily === 'iconfont' && name?.startsWith('van-icon-')) {
      fontFamily = 'is-van-icon'
    }

    return { ...rest, fontFamily, name }
  })
</script>
