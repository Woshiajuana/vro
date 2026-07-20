<template>
  <vro-van-cell v-bind="cellProps">
    <vro-input v-bind="inputProps" />
    <vro-van-icon
      v-show="modelValue && clearable && !disabled"
      class="vro-van-filed-clear"
      name="van-icon-clear"
    />
    <span v-if="unit" class="vro-van-filed-unit">{{ unit }}</span>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { VroInput, vroInputProps } from '@vrojs/base'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanFieldCellProps, vroVanFieldProps } from './types'

  defineOptions({ name: 'VroVanField' })

  const props = defineProps(vroVanFieldProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanFieldCellProps)))
  const inputProps = computed(() => pick(props, typedKeys(vroInputProps)))
</script>
