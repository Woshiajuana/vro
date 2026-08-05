<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-datetime-range-select-picker"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-loading': loading,
    }"
    :arrow="showArrow"
    :clickable="clickable && !disabled && !readonly && !loading"
    @click="handleClick('start', $event)"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <div class="vro-van-datetime-range-select-picker-values">
      <button
        class="vro-van-datetime-range-select-picker-value"
        :class="{ 'is-placeholder': !startText }"
        type="button"
        @click.stop="handleClick('start', $event)"
      >
        <slot name="start" :text="startText" :value="startValue">
          {{ startText || startPlaceholder || t('datetimeRangeSelectPicker.startPlaceholder') }}
        </slot>
      </button>
      <span class="vro-van-datetime-range-select-picker-separator">
        <slot name="separator">
          {{ separator || t('datetimeRangeSelectPicker.separator') }}
        </slot>
      </span>
      <button
        class="vro-van-datetime-range-select-picker-value"
        :class="{ 'is-placeholder': !endText }"
        type="button"
        @click.stop="handleClick('end', $event)"
      >
        <slot name="end" :text="endText" :value="endValue">
          {{ endText || endPlaceholder || t('datetimeRangeSelectPicker.endPlaceholder') }}
        </slot>
      </button>
    </div>

    <vro-van-icon
      v-show="showClear"
      class="vro-van-datetime-range-select-picker-clear"
      name="van-icon-clear"
      @click.stop="handleClear"
    />

    <vro-loading
      v-show="loading"
      class="vro-van-datetime-range-select-picker-loading"
      type="spinner"
    />
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { formatDate, isEmpty, normalizeDate, pick, typedKeys } from '@daysnap/utils'
  import { VroLoading } from '@vrojs/base'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanCell } from '../vro-van-cell'
  import {
    showVroVanDatetimePicker,
    type VroVanDatetimePickerProps,
    type VroVanDatetimePickerResult,
  } from '../vro-van-datetime-picker'
  import { normalizeDatetimePickerFormat } from '../vro-van-datetime-picker/utils'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanTriggerCellCellProps } from '../vro-van-trigger-cell'
  import {
    type VroVanDatetimeRangeSelectPickerEmits,
    vroVanDatetimeRangeSelectPickerPickerProps,
    vroVanDatetimeRangeSelectPickerProps,
    type VroVanDatetimeRangeSelectPickerResult,
    type VroVanDatetimeRangeSelectPickerSlots,
    type VroVanDatetimeRangeSelectPickerType,
    type VroVanDatetimeRangeSelectPickerValue,
  } from './types'

  defineOptions({ name: 'VroVanDatetimeRangeSelectPicker' })

  const slots = defineSlots<VroVanDatetimeRangeSelectPickerSlots>()
  const emit = defineEmits<VroVanDatetimeRangeSelectPickerEmits>()
  const props = defineProps(vroVanDatetimeRangeSelectPickerProps)

  const { t } = useLocale()

  const cellProps = computed(() => pick(props, typedKeys(vroVanTriggerCellCellProps)))
  const pickerProps = computed(() =>
    pick(props, typedKeys(vroVanDatetimeRangeSelectPickerPickerProps)),
  )
  const modelValue = computed(() => props.modelValue || [])
  const startValue = computed(() => modelValue.value[0])
  const endValue = computed(() => modelValue.value[1])
  const normalizedFormat = computed(() => normalizeDatetimePickerFormat(props.format))
  const startText = computed(() => formatDisplayValue(startValue.value))
  const endText = computed(() => formatDisplayValue(endValue.value))
  const showClear = computed(() => {
    const { clearable, disabled, loading, readonly } = props
    return (
      clearable &&
      !disabled &&
      !loading &&
      !readonly &&
      (!isEmpty(startValue.value) || !isEmpty(endValue.value))
    )
  })
  const showArrow = computed(
    () => props.arrow && !props.disabled && !props.loading && !props.readonly && !showClear.value,
  )

  const formatDisplayValue = (value: VroVanDatetimeRangeSelectPickerValue | undefined) => {
    if (isEmpty(value)) {
      return ''
    }

    if (value instanceof Date) {
      return formatDate(value, normalizedFormat.value)
    }

    return `${value}`
  }

  const normalizePickerDate = (value: VroVanDatetimeRangeSelectPickerValue | undefined) => {
    if (isEmpty(value)) {
      return undefined
    }

    const date = normalizeDate(value as VroVanDatetimeRangeSelectPickerValue)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  const createPickerProps = (type: VroVanDatetimeRangeSelectPickerType) => {
    const startDate = normalizePickerDate(startValue.value)
    const endDate = normalizePickerDate(endValue.value)
    const dynamicProps: Partial<VroVanDatetimePickerProps> = {
      modelValue: type === 'start' ? startValue.value : endValue.value,
      title:
        type === 'start'
          ? props.startTitle || t('datetimeRangeSelectPicker.startTitle')
          : props.endTitle || t('datetimeRangeSelectPicker.endTitle'),
    }

    if (type === 'start') {
      dynamicProps.max = endDate || props.max
    } else {
      dynamicProps.min = startDate || props.min
    }

    return {
      ...pickerProps.value,
      ...dynamicProps,
    }
  }

  const handleClick = async (type: VroVanDatetimeRangeSelectPickerType, event: MouseEvent) => {
    if (props.disabled || props.loading || props.readonly) {
      return
    }

    emit('click', event)

    let pickerResult: VroVanDatetimePickerResult

    try {
      pickerResult = await showVroVanDatetimePicker(createPickerProps(type))
    } catch (err) {
      if (err !== 'cancel') {
        throw err
      }

      return
    }

    const value = props.valueType === 'date' ? pickerResult.date : pickerResult.value
    const nextValue = [...modelValue.value] as [
      VroVanDatetimeRangeSelectPickerValue?,
      VroVanDatetimeRangeSelectPickerValue?,
    ]
    const index = type === 'start' ? 0 : 1

    nextValue[index] = value

    const result: VroVanDatetimeRangeSelectPickerResult = {
      type,
      value: nextValue,
      result: pickerResult,
    }

    emit('update:modelValue', nextValue)
    emit('change', nextValue, result)
  }

  const handleClear = () => {
    const value = props.emptyValue

    emit('update:modelValue', value)
    emit('change', value)
    emit('clear')
  }
</script>
