<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-trigger-cell"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
    }"
    :arrow="showArrow"
    :clickable="clickable && !disabled && !readonly"
    @click="handleClick"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <span
      class="vro-van-trigger-cell-value"
      :class="{ 'is-placeholder': isEmptyValue }"
      v-html="isEmptyValue ? placeholder : displayValue"
    ></span>

    <vro-van-icon
      v-show="showClear"
      class="vro-van-trigger-cell-clear"
      name="van-icon-clear"
      @click.stop="handleClear"
    />
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { isEmpty, pick, typedKeys } from '@daysnap/utils'
  import { computed } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import { VroVanIcon } from '../vro-van-icon'
  import {
    vroVanTriggerCellCellProps,
    type VroVanTriggerCellEmits,
    vroVanTriggerCellProps,
    type VroVanTriggerCellSlots,
  } from './types'

  defineOptions({ name: 'VroVanTriggerCell' })
  const slots = defineSlots<VroVanTriggerCellSlots>()
  const emit = defineEmits<VroVanTriggerCellEmits>()
  const props = defineProps(vroVanTriggerCellProps)

  const cellProps = computed(() => pick(props, typedKeys(vroVanTriggerCellCellProps)))
  const displayValue = computed(() => props.formatter(props.modelValue))
  const isEmptyValue = computed(() => isEmpty(displayValue.value))
  const showClear = computed(() => {
    const { clearable, disabled, readonly } = props
    return clearable && !disabled && !readonly && !isEmptyValue.value
  })
  const showArrow = computed(
    () => props.arrow && !props.disabled && !props.readonly && !showClear.value,
  )

  const handleClick = (event: MouseEvent) => {
    if (props.disabled || props.readonly) {
      return
    }

    emit('click', event)
  }

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
  }
</script>
