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
    @click="handleClick(0, $event)"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <div class="vro-van-datetime-range-select-picker-values">
      <button
        class="vro-van-datetime-range-select-picker-value"
        :class="{ 'is-placeholder': !modelValue?.[0] }"
        type="button"
        @click.stop="handleClick(0, $event)"
      >
        <slot name="start" :text="modelValue?.[0] || ''" :value="modelValue?.[0]">
          {{
            modelValue?.[0] || startPlaceholder || t('datetimeRangeSelectPicker.startPlaceholder')
          }}
        </slot>
      </button>
      <span class="vro-van-datetime-range-select-picker-separator">
        <slot name="separator">
          {{ separator || t('datetimeRangeSelectPicker.separator') }}
        </slot>
      </span>
      <button
        class="vro-van-datetime-range-select-picker-value"
        :class="{ 'is-placeholder': !modelValue?.[1] }"
        type="button"
        @click.stop="handleClick(1, $event)"
      >
        <slot name="end" :text="modelValue?.[1] || ''" :value="modelValue?.[1]">
          {{ modelValue?.[1] || endPlaceholder || t('datetimeRangeSelectPicker.endPlaceholder') }}
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
  import { isEmpty, normalizeDate, pick, typedKeys } from '@daysnap/utils'
  import { VroLoading } from '@vrojs/base'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanCell } from '../vro-van-cell'
  import { showVroVanDatetimePicker } from '../vro-van-datetime-picker'
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanTriggerCellCellProps } from '../vro-van-trigger-cell'
  import {
    type VroVanDatetimeRangeSelectPickerEmits,
    vroVanDatetimeRangeSelectPickerPickerProps,
    vroVanDatetimeRangeSelectPickerProps,
    type VroVanDatetimeRangeSelectPickerSlots,
  } from './types'

  defineOptions({ name: 'VroVanDatetimeRangeSelectPicker' })

  const slots = defineSlots<VroVanDatetimeRangeSelectPickerSlots>()
  const emit = defineEmits<VroVanDatetimeRangeSelectPickerEmits>()
  const props = defineProps(vroVanDatetimeRangeSelectPickerProps)

  const { t } = useLocale()

  const cellProps = computed(() => pick(props, typedKeys(vroVanTriggerCellCellProps)))
  const showClear = computed(() => {
    const { clearable, disabled, loading, readonly } = props
    return (
      clearable &&
      !disabled &&
      !loading &&
      !readonly &&
      (!isEmpty(props.modelValue?.[0]) || !isEmpty(props.modelValue?.[1]))
    )
  })
  const showArrow = computed(
    () => props.arrow && !props.disabled && !props.loading && !props.readonly && !showClear.value,
  )

  const normalizePickerDate = (value: string | undefined) => {
    if (value == null || value === '') {
      return undefined
    }

    const date = normalizeDate(value)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  const getPlaceholder = (index: 0 | 1) => {
    return index === 0
      ? props.startPlaceholder || t('datetimeRangeSelectPicker.startPlaceholder')
      : props.endPlaceholder || t('datetimeRangeSelectPicker.endPlaceholder')
  }

  const createPickerProps = (index: 0 | 1) => {
    return {
      ...pick(props, typedKeys(vroVanDatetimeRangeSelectPickerPickerProps)),
      modelValue: props.modelValue?.[index],
      title: getPlaceholder(index),
      max: index === 0 ? normalizePickerDate(props.modelValue?.[1]) || props.max : props.max,
      min: index === 1 ? normalizePickerDate(props.modelValue?.[0]) || props.min : props.min,
    }
  }

  const handleClick = async (index: 0 | 1, event: MouseEvent) => {
    if (props.disabled || props.loading || props.readonly) {
      return
    }

    emit('click', event)

    try {
      const pickerResult = await showVroVanDatetimePicker(createPickerProps(index))
      const nextValue = [...(props.modelValue || [])] as [string?, string?]

      nextValue[index] = pickerResult.value

      emit('update:modelValue', nextValue)
      emit('change', nextValue)
    } catch (err) {
      if (err !== 'cancel') {
        throw err
      }
    }
  }

  const handleClear = () => {
    const value = props.emptyValue

    emit('update:modelValue', value)
    emit('change', value)
    emit('clear')
  }
</script>
