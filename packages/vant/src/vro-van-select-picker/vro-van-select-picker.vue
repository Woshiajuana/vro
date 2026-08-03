<template>
  <vro-van-trigger-cell
    v-bind="triggerCellProps"
    class="vro-van-select-picker"
    :model-value="displayValue"
    :loading="loading"
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
  import { isArray, isFunction, pick, typedKeys } from '@daysnap/utils'
  import { useAsyncTask } from '@vrojs/use'
  import type { PickerColumn, PickerOption } from 'vant'
  import { computed } from 'vue'

  import { showVroVanPicker } from '../vro-van-picker'
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

  const triggerCellProps = computed(() =>
    pick(props, typedKeys(vroVanSelectPickerTriggerCellProps)),
  )

  const {
    loading,
    data: columns,
    trigger,
  } = useAsyncTask(
    async () => {
      const { options } = props
      let res: VroVanSelectPickerColumns = []
      if (isFunction(options)) {
        res = await options()
      } else {
        res = options
      }
      return res
    },
    {
      immediate: !isFunction(props.options) || props.trigger === 'immediately',
      throwError: true,
      initialValue: [],
    },
  )

  const displayValue = computed(() => {
    const { formatter, modelValue, valueType } = props
    if (formatter) {
      return modelValue
    }

    if (isEmptyValue(modelValue)) {
      return ''
    }

    if (valueType === 'object') {
      return toArray<PickerOption>(modelValue).map(getOptionText).filter(Boolean).join(' / ')
    }

    const options = columns.value
    const values = toArray(modelValue)
    const selectedOptions = isColumnGroup(options)
      ? values.map((value, index) => findOptionByValue(options[index] ?? [], value))
      : (findOptionsByPath(options, values) ??
        values.map((value) => findOptionByValue(options, value)))

    return selectedOptions.map(getOptionText).filter(Boolean).join(' / ')
  })

  const handleSelect = async () => {
    await trigger()

    const pickerProps = pick(props, typedKeys(vroVanSelectPickerPickerProps))
    let selectedOptions: PickerOption[]

    try {
      ;({ selectedOptions } = await showVroVanPicker({
        ...pickerProps,
        columns: columns.value,
        modelValue: props.modelValue,
      }))
    } catch (err) {
      if (err !== 'cancel') {
        throw err
      }

      return
    }

    const isMultipleValue = isColumnGroup(columns.value) || selectedOptions.length > 1
    const value = getSelectedValue(selectedOptions, isMultipleValue)

    emit('update:modelValue', value)
    emit('change', value)
  }

  const handleClear = () => {
    const value = getEmptyValue()
    emit('update:modelValue', value)
    emit('change', value)
    emit('clear')
  }

  const toArray = <T,>(value: T | T[]) => {
    return isArray(value) ? value : [value]
  }

  const getEmptyValue = () => {
    return props.emptyValue !== undefined ? props.emptyValue : isArray(props.modelValue) ? [] : ''
  }

  const getSelectedValue = (selectedOptions: PickerOption[], isMultipleValue: boolean) => {
    if (props.valueType === 'object') {
      return isMultipleValue ? selectedOptions : selectedOptions[0]
    }

    return isMultipleValue
      ? selectedOptions.map((item) => getOptionValue(item))
      : getOptionValue(selectedOptions[0])
  }

  const isColumnGroup = (options: VroVanSelectPickerColumns): options is PickerColumn[] => {
    return isArray(options[0])
  }

  const findOptionByValue = (
    options: VroVanSelectPickerColumns,
    value: unknown,
  ): PickerOption | undefined => {
    for (const option of options) {
      if (isArray(option)) {
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

  const findOptionsByPath = (
    options: VroVanSelectPickerColumns,
    values: unknown[],
  ): PickerOption[] | undefined => {
    const selectedOptions: PickerOption[] = []
    let currentOptions = options

    for (const value of values) {
      const option = currentOptions.find(
        (item) => !isArray(item) && getOptionValue(item) === value,
      ) as PickerOption | undefined

      if (!option) {
        return
      }

      selectedOptions.push(option)
      currentOptions = getOptionChildren(option) ?? []
    }

    return selectedOptions
  }

  const getOptionText = (option?: PickerOption) => {
    return option?.[getFieldName('text')] ?? ''
  }

  const getOptionValue = (option?: PickerOption) => {
    return option?.[getFieldName('value')]
  }

  const getOptionChildren = (option: PickerOption) => {
    return option[getFieldName('children')] as VroVanSelectPickerColumns | undefined
  }

  const getFieldName = (name: 'text' | 'value' | 'children') => {
    return props.columnsFieldNames?.[name] ?? name
  }

  const isEmptyValue = (value: unknown) => {
    return value == null || value === '' || (isArray(value) && !value.length)
  }
</script>
