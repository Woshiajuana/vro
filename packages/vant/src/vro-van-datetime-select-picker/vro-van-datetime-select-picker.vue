<template>
  <vro-van-trigger-cell
    v-bind="triggerCellProps"
    class="vro-van-datetime-select-picker"
    :model-value="displayValue"
    @click="handleSelect"
    @clear="handleClear"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </vro-van-trigger-cell>
</template>

<script setup lang="ts">
  import { formatDate, isEmpty, pick, typedKeys } from '@daysnap/utils'
  import { computed } from 'vue'

  import {
    showVroVanDatetimePicker,
    type VroVanDatetimePickerResult,
  } from '../vro-van-datetime-picker'
  import { normalizeDatetimePickerFormat } from '../vro-van-datetime-picker/utils'
  import { VroVanTriggerCell } from '../vro-van-trigger-cell'
  import {
    type VroVanDatetimeSelectPickerEmits,
    vroVanDatetimeSelectPickerPickerProps,
    vroVanDatetimeSelectPickerProps,
    type VroVanDatetimeSelectPickerSlots,
    vroVanDatetimeSelectPickerTriggerCellProps,
  } from './types'

  defineOptions({ name: 'VroVanDatetimeSelectPicker' })

  const slots = defineSlots<VroVanDatetimeSelectPickerSlots>()
  const emit = defineEmits<VroVanDatetimeSelectPickerEmits>()
  const props = defineProps(vroVanDatetimeSelectPickerProps)

  const triggerCellProps = computed(() =>
    pick(props, typedKeys(vroVanDatetimeSelectPickerTriggerCellProps)),
  )
  const pickerProps = computed(() => pick(props, typedKeys(vroVanDatetimeSelectPickerPickerProps)))
  const normalizedFormat = computed(() => normalizeDatetimePickerFormat(props.format))
  const displayValue = computed(() => {
    const { formatter, modelValue } = props

    if (formatter) {
      return modelValue
    }

    if (isEmpty(modelValue)) {
      return ''
    }

    if (modelValue instanceof Date) {
      return formatDate(modelValue, normalizedFormat.value)
    }

    return `${modelValue}`
  })

  const handleSelect = async () => {
    let result: VroVanDatetimePickerResult

    try {
      result = await showVroVanDatetimePicker({
        ...pickerProps.value,
        modelValue: props.modelValue,
      })
    } catch (err) {
      if (err !== 'cancel') {
        throw err
      }

      return
    }

    const value = props.valueType === 'date' ? result.date : result.value

    emit('update:modelValue', value)
    emit('change', value, result)
  }

  const handleClear = () => {
    const value = props.emptyValue

    emit('update:modelValue', value)
    emit('change', value)
    emit('clear')
  }
</script>
