<template>
  <VroVanCell class="vro-van-plate-input">
    <button class="vro-van-plate-input-button">
      {{ prefix }}
      <VroVanIcon />
    </button>
    <span class="vro-van-plate-input-value">{{ suffix || placeholder }}</span>
  </VroVanCell>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanPlateInputProps } from './types'

  defineOptions({ name: 'VroVanPlateInput' })

  const props = defineProps(vroVanPlateInputProps)

  const prefix = ref('')
  const suffix = ref('')

  watchEffect(() => {
    const { modelValue } = props
    prefix.value = modelValue?.substring(0, 1) ?? ''
    suffix.value = modelValue?.substring(1) ?? ''
  })
</script>
