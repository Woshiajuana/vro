<template>
  <van-icon name="chat-o" />
</template>

<script setup lang="ts">
  import { Icon as VanIcon } from 'vant'

  import { vroVanIconProps } from './types'

  defineOptions({ name: 'VroVanIcon' })

  defineProps(vroVanIconProps)
</script>
