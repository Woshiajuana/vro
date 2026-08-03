<template>
  <vro-van-trigger-cell
    v-bind="triggerCellProps"
    class="vro-van-select-picker"
    :model-value="modelValue"
    :loading="loading"
    @click="handleSelect"
    @clear="handleClear"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </vro-van-trigger-cell>
</template>

<script setup lang="ts">
  import { isArray, isFunction, isPromiseLike, pick, typedKeys } from '@daysnap/utils'
  import { useAsyncTask } from '@vrojs/use'
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
      immediate: props.trigger === 'immediately',
      throwError: true,
      initialValue: [],
    },
  )

  const handleSelect = async () => {
    await trigger()

    const pickerProps = pick(props, typedKeys(vroVanSelectPickerPickerProps))
    const { selectedOptions } = await showVroVanPicker({
      ...pickerProps,
      columns: columns.value,
    })

    const { valueType } = props
    const isMultiple = isArray(columns.value[0])
    if (isMultiple) {
      const value =
        valueType === 'object' ? selectedOptions : selectedOptions.map((item) => item?.value)
      emit('update:modelValue', value)
      emit('change', value)
    } else {
      const value = valueType === 'object' ? selectedOptions[0] : selectedOptions[0]?.value
      emit('update:modelValue', value)
      emit('change', value)
    }
  }

  const handleClear = () => {
    const value = isArray(props.modelValue) ? [] : ''
    emit('update:modelValue', value)
  }
</script>
