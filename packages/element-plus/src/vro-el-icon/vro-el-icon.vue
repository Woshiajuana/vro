<template>
  <el-icon class="vro-el-icon" v-bind="props">
    <slot>
      <component v-if="isElement" :is="name" />
      <i v-else class="iconfont" :class="[name]"></i>
    </slot>
  </el-icon>
</template>

<script setup lang="ts">
  import { isString } from '@daysnap/utils'
  import { ElIcon } from 'element-plus'
  import { computed } from 'vue'

  import { vroElIconProps } from './types'

  defineOptions({ name: 'VroElIcon' })
  const props = defineProps(vroElIconProps)

  const isElement = computed(() => {
    const { name } = props
    if (isString(name)) {
      const char = name.substring(0, 1)
      return char >= 'A' && char <= 'Z'
    }
    return true
  })
</script>
