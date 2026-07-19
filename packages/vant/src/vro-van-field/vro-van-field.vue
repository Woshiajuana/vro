<template>
  <vro-van-cell>
    <vro-input />
    <vro-van-icon name="van-icon-clear" />
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { VroInput } from '@vrojs/base'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanFieldProps } from './types'

  defineOptions({ name: 'VroVanField' })

  defineProps(vroVanFieldProps)
</script>
