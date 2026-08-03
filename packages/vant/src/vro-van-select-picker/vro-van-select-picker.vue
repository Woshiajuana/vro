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
  import type { PickerOption } from 'vant'
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
      return formatter(modelValue)
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
      ? values.map((value, index) =>
          findOptionByValue((options as VroVanSelectPickerColumns[])[index] ?? [], value),
        )
      : values.map((value) => findOptionByValue(options, value))

    return selectedOptions.map(getOptionText).filter(Boolean).join(' / ')
  })

  const handleSelect = async () => {
    await trigger()

    const pickerProps = pick(props, typedKeys(vroVanSelectPickerPickerProps))
    const { selectedOptions } = await showVroVanPicker({
      ...pickerProps,
      columns: columns.value,
      modelValue: getPickerModelValue(),
    })

    const { valueType } = props
    if (isColumnGroup(columns.value)) {
      const value =
        valueType === 'object'
          ? selectedOptions
          : selectedOptions.map((item) => getOptionValue(item))
      emit('update:modelValue', value)
      emit('change', value)
    } else {
      const value = valueType === 'object' ? selectedOptions[0] : getOptionValue(selectedOptions[0])
      emit('update:modelValue', value)
      emit('change', value)
    }
  }

  const handleClear = () => {
    const value = isArray(props.modelValue) ? [] : ''
    emit('update:modelValue', value)
    emit('change', value)
    emit('clear')
  }

  const toArray = <T,>(value: T | T[]) => {
    return isArray(value) ? value : [value]
  }

  const getPickerModelValue = () => {
    if (isEmptyValue(props.modelValue)) {
      return []
    }

    if (props.valueType === 'object') {
      return toArray<PickerOption>(props.modelValue).map(getOptionValue)
    }

    return toArray(props.modelValue)
  }

  const isColumnGroup = (options: VroVanSelectPickerColumns) => {
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
