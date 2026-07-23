<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-picker"
    :show="visible"
    @click-overlay="hide('cancel')"
    @click-close-icon="hide('cancel')"
  >
    <van-picker
      v-bind="pickerAttrs"
      ref="vanPickerRef"
      :columns="filteredColumns"
      @update:model-value="$emit('update:modelValue', $event)"
      @confirm="handleConfirm"
      @cancel="hide('cancel')"
      @change="$emit('change', $event)"
      @click-option="$emit('clickOption', $event)"
      @scroll-into="$emit('scrollInto', $event)"
    ></van-picker>

    <input
      v-if="computedProps.filterable"
      v-model="keyword"
      :placeholder="computedProps.filterPlaceholder || t('picker.filterPlaceholder')"
      class="vro-van-picker-filter"
      type="text"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useVisible } from '@vrojs/use'
  import type { PickerColumn, PickerConfirmEventParams, PickerInstance, PickerOption } from 'vant'
  import { Picker as VanPicker, pickerProps, Popup as VanPopup } from 'vant'
  import { computed, ref, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import {
    VRO_VAN_PICKER_NO_DATA_VALUE,
    type VroVanPickerEmits,
    type VroVanPickerProps,
    vroVanPickerProps,
    type VroVanPickerResult,
  } from './types'

  defineOptions({ name: 'VroVanPicker' })
  const emit = defineEmits<VroVanPickerEmits>()
  const props = defineProps(vroVanPickerProps)

  const { t } = useLocale()
  const vanPickerRef = useTemplateRef<PickerInstance>('vanPickerRef')

  const dynamicProps = ref<Partial<VroVanPickerProps>>()
  const keyword = ref('')

  const computedProps = computed<VroVanPickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const pickerAttrs = computed(() => pick(computedProps.value, typedKeys(pickerProps)))
  const noDataOption = computed<PickerOption>(() => {
    const { text = 'text', value = 'value' } = computedProps.value.columnsFieldNames ?? {}

    return {
      [text]: t('picker.emptyText'),
      [value]: VRO_VAN_PICKER_NO_DATA_VALUE,
    }
  })

  const filteredColumns = computed(() => {
    const { columns } = computedProps.value
    const value = keyword.value.trim().toLowerCase()
    const result =
      computedProps.value.filterable && value
        ? filterColumns(columns as Array<PickerColumn | PickerOption>, value)
        : columns

    return hasColumnsData(result as Array<PickerColumn | PickerOption>)
      ? result
      : [noDataOption.value]
  })

  const {
    show,
    hide,
    confirm: confirmPicker,
    visible,
  } = useVisible<Partial<VroVanPickerProps>, VroVanPickerResult>({
    showCallback: (options) => {
      keyword.value = ''
      dynamicProps.value = options
    },
    hideCallback: (reason) => {
      emit('cancel', reason)
    },
    confirmCallback: (params: PickerConfirmEventParams) => {
      const result = {
        ...params,
        value:
          params.selectedValues.length === 1 ? params.selectedValues[0] : params.selectedValues,
      }

      emit('confirm', result)
      return result
    },
  })

  const handleConfirm = (params: PickerConfirmEventParams) => {
    if (isNoDataResult(params)) {
      hide('cancel')
      return
    }

    confirmPicker(params)
  }

  const filterColumns = (columns: Array<PickerColumn | PickerOption>, value: string) => {
    if (isColumnGroup(columns)) {
      return columns.map((column) => filterOptions(column, value))
    }

    return filterOptions(columns as PickerColumn, value)
  }

  const filterOptions = (options: PickerColumn, value: string): PickerColumn => {
    const { text = 'text', children = 'children' } = computedProps.value.columnsFieldNames ?? {}

    return options
      .map((option) => {
        const childOptions = option[children] as PickerColumn | undefined
        const filteredChildren = childOptions ? filterOptions(childOptions, value) : undefined
        const matched = `${option[text] ?? ''}`.toLowerCase().includes(value)

        if (!matched && !filteredChildren?.length) {
          return
        }

        return filteredChildren ? { ...option, [children]: filteredChildren } : option
      })
      .filter(Boolean) as PickerColumn
  }

  const isColumnGroup = (
    columns: Array<PickerColumn | PickerOption>,
  ): columns is PickerColumn[] => {
    return Array.isArray(columns[0])
  }

  const hasColumnsData = (columns: Array<PickerColumn | PickerOption>) => {
    if (!columns.length) {
      return false
    }

    if (isColumnGroup(columns)) {
      return columns.every((column) => column.length)
    }

    return true
  }

  const isNoDataResult = (params: PickerConfirmEventParams) => {
    const { value = 'value' } = computedProps.value.columnsFieldNames ?? {}

    return (
      params.selectedValues.includes(VRO_VAN_PICKER_NO_DATA_VALUE) ||
      params.selectedOptions.some((option) => option?.[value] === VRO_VAN_PICKER_NO_DATA_VALUE)
    )
  }

  defineExpose({
    show,
    hide,
    confirm: confirmPicker,
    get vanPickerRef() {
      return vanPickerRef.value!
    },
  })
</script>
