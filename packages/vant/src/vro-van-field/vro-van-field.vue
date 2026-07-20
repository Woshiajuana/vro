<template>
  <vro-van-cell v-bind="cellProps">
    <vro-input v-bind="inputProps" />
    <vro-van-icon name="van-icon-clear" />
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { VroInput, vroInputProps } from '@vrojs/base'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanCellInFieldProps, vroVanFieldProps } from './types'

  defineOptions({ name: 'VroVanField' })

  const props = defineProps(vroVanFieldProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanCellInFieldProps)))
  const inputProps = computed(() => pick(props, typedKeys(vroInputProps)))
</script>
