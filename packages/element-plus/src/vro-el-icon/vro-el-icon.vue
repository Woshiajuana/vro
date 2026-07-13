<template>
  <vro-icon class="vro-el-icon" v-bind="resolved.attrs">
    <slot>
      <component v-if="resolved.is" :is="resolved.is" />
    </slot>
  </vro-icon>
</template>

<script setup lang="ts">
  import { isObject, isString } from '@daysnap/utils'
  import { VroIcon } from '@vrojs/base'
  import { computed } from 'vue'

  import { vroElIconProps } from './types'

  defineOptions({ name: 'VroElIcon' })
  const props = defineProps(vroElIconProps)

  const resolved = computed(() => {
    const { name, ...attrs } = props
    let is: string | object | null = null
    if (isString(name)) {
      const char = name.substring(0, 1)
      if (char >= 'A' && char <= 'Z') {
        is = name
      } else {
        Object.assign(attrs, { name })
      }
    } else if (isObject(name)) {
      is = name
    }

    return {
      is,
      attrs,
    }
  })
</script>
