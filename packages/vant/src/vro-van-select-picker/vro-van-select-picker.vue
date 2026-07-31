<template>
  <vro-van-trigger-cell
    v-bind="triggerCellProps"
    class="vro-van-select-picker"
    :model-value="modelValue"
    :formatter="formatTriggerValue"
    :disabled="disabled || loadingOptions"
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
  import { isFunction, isPromiseLike, pick, typedKeys } from '@daysnap/utils'
  import type { PickerChangeEventParams, PickerOption } from 'vant'
  import { computed, onMounted, ref } from 'vue'

  import {
    showVroVanPicker,
    type VroVanPickerProps,
    type VroVanPickerResult,
  } from '../vro-van-picker'
  import { VroVanTriggerCell } from '../vro-van-trigger-cell'
  import {
    type VroVanSelectPickerColumns,
    type VroVanSelectPickerEmits,
    vroVanSelectPickerPickerProps,
    vroVanSelectPickerProps,
    type VroVanSelectPickerSlots,
    vroVanSelectPickerTriggerCellProps,
  } from './types'

  defineOptions({ name: 'VroVanSelectPicker' })

  const slots = defineSlots<VroVanSelectPickerSlots>()
  const emit = defineEmits<VroVanSelectPickerEmits>()
  const props = defineProps(vroVanSelectPickerProps)

  const columns = ref<VroVanSelectPickerColumns>(isFunction(props.options) ? [] : props.options)
  const loadingOptions = ref(false)

  const triggerCellProps = computed(() =>
    pick(props, typedKeys(vroVanSelectPickerTriggerCellProps)),
  )
  const pickerProps = computed(() => pick(props, typedKeys(vroVanSelectPickerPickerProps)))
  const resolvedColumns = computed(() =>
    isFunction(props.options) ? columns.value : props.options,
  )

  const selectedText = computed(() => {
    const selectedOptions = getSelectedOptions()
    return selectedOptions.length ? selectedOptions.map(getOptionText).join(' / ') : undefined
  })

  onMounted(() => {
    if (props.trigger === 'immediately') {
      loadOptions()
    }
  })

  const formatTriggerValue = (value: any) => {
    return selectedText.value ?? props.formatter(value)
  }

  const handleSelect = async (event: MouseEvent) => {
    emit('click', event)

    let options: VroVanSelectPickerColumns

    try {
      options = await loadOptions()
    } catch (error) {
      emit('error', error)
      return
    }

    try {
      const showPickerOptions = {
        ...pickerProps.value,
        columns: options,
        modelValue: getPickerModelValue(),
        onChange: (params: PickerChangeEventParams) => emit('change', params),
        onClickOption: (option: PickerOption) => emit('clickOption', option),
        onScrollInto: (option: PickerOption) => emit('scrollInto', option),
      } as Partial<VroVanPickerProps> & {
        onChange: (params: PickerChangeEventParams) => void
        onClickOption: (option: PickerOption) => void
        onScrollInto: (option: PickerOption) => void
      }

      const result = await showVroVanPicker<VroVanPickerResult>(showPickerOptions)

      emit('update:modelValue', result.value)
      emit('confirm', result)
    } catch (error) {
      emit('cancel', error)
    }
  }

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
  }

  const loadOptions = async () => {
    if (!isFunction(props.options)) {
      columns.value = props.options
      return columns.value
    }

    const result = props.options()

    if (!isPromiseLike(result)) {
      columns.value = result
      return columns.value
    }

    loadingOptions.value = true

    try {
      columns.value = await result
      return columns.value
    } finally {
      loadingOptions.value = false
    }
  }

  const getPickerModelValue = () => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue
    }

    return props.modelValue == null || props.modelValue === '' ? [] : [props.modelValue]
  }

  const getSelectedOptions = () => {
    const values = getPickerModelValue()

    return values
      .map((value) => findOptionByValue(resolvedColumns.value, value))
      .filter(Boolean) as PickerOption[]
  }

  const findOptionByValue = (
    options: VroVanSelectPickerColumns,
    value: unknown,
  ): PickerOption | undefined => {
    for (const option of options) {
      if (Array.isArray(option)) {
        const matched = findOptionByValue(option, value)

        if (matched) {
          return matched
        }

        continue
      }

      if (getOptionValue(option) === value) {
        return option
      }

      const children = getOptionChildren(option)

      if (children?.length) {
        const matched = findOptionByValue(children, value)

        if (matched) {
          return matched
        }
      }
    }
  }

  const getOptionText = (option: PickerOption) => {
    return option[getFieldName('text')] ?? ''
  }

  const getOptionValue = (option: PickerOption) => {
    return option[getFieldName('value')]
  }

  const getOptionChildren = (option: PickerOption) => {
    return option[getFieldName('children')] as VroVanSelectPickerColumns | undefined
  }

  const getFieldName = (name: 'text' | 'value' | 'children') => {
    return props.columnsFieldNames?.[name] ?? name
  }
</script>
