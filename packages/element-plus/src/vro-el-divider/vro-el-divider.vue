<template>
  <el-divider class="vro-el-divider" v-bind="elDividerProps">
    <template v-if="props.content || $slots.default" #default>
      <slot>{{ props.content }}</slot>
    </template>
  </el-divider>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { dividerProps, ElDivider } from 'element-plus'
  import { computed } from 'vue'

  import { vroElDividerProps, type VroElDividerSlots } from './types'

  defineOptions({ name: 'VroElDivider' })

  const props = defineProps(vroElDividerProps)
  defineSlots<VroElDividerSlots>()

  const elDividerProps = computed(() => pick(props, typedKeys(dividerProps)))
</script>
