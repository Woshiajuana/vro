<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-field"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
    }"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <vro-input
      v-bind="inputProps"
      class="vro-van-field-input"
      ref="inputRef"
      @update:model-value="$emit('update:modelValue', $event)"
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
    />

    <vro-van-icon
      v-show="showClear"
      class="vro-van-field-clear"
      name="van-icon-clear"
      @click="handleClear"
    />

    <span v-if="unit" class="vro-van-field-unit">{{ unit }}</span>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { VroInput, type VroInputInstance, vroInputProps } from '@vrojs/base'
  import { computed, ref } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import {
    vroVanFieldCellProps,
    type VroVanFieldEmits,
    vroVanFieldProps,
    type VroVanFieldSlots,
  } from './types'

  defineOptions({ name: 'VroVanField' })
  defineSlots<VroVanFieldSlots>()
  const emit = defineEmits<VroVanFieldEmits>()
  const props = defineProps(vroVanFieldProps)

  const vroInputRef = ref<VroInputInstance>()

  const cellProps = computed(() => pick(props, typedKeys(vroVanFieldCellProps)))
  const inputProps = computed(() => pick(props, typedKeys(vroInputProps)))
  const showClear = computed(() => {
    const { clearable, disabled, readonly, modelValue } = props
    return clearable && !disabled && !readonly && modelValue !== '' && modelValue != null
  })

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
  }

  defineExpose({
    get input() {
      return vroInputRef.value!.input
    },
    get vroInput() {
      return vroInputRef.value!
    },
  })
</script>
