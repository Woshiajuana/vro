<template>
  <button class="vro-el-button">
    <VroElIcon />
    <span>vro-el-button</span>
    <VroInput></VroInput>
  </button>
</template>

<script setup lang="ts">
  import { VroInput } from '@vrojs/core'

  import { VroElIcon } from '../vro-el-icon'
  import { vroElButtonProps } from './types'

  defineOptions({ name: 'VroElButton' })

  defineProps(vroElButtonProps)
</script>
