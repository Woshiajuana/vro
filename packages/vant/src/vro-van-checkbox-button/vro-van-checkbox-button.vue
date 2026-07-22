<template>
  <vro-van-cell class="vro-van-checkbox-button">
    <button class="vro-van-checkbox-button-item" type="button"></button>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { VroVanCell } from '../vro-van-cell'
  import { vroVanCheckboxButtonProps } from './types'

  defineOptions({ name: 'VroVanCheckboxButton' })

  defineProps(vroVanCheckboxButtonProps)
</script>
