<template>
  <van-popup
    v-bind="popupAttrs"
    class="vro-van-picker"
    :show="visible"
    @click-overlay="hide('overlay')"
    @click-close-icon="hide('close')"
  >
    <slot></slot>

    <slot
      v-if="computedProps.filterable"
      name="filter"
      :keyword="keyword"
      :placeholder="filterInputPlaceholder"
      :set-keyword="setKeyword"
    >
      <input
        v-model="keyword"
        :placeholder="filterInputPlaceholder"
        class="vro-van-picker-filter"
        type="text"
      />
    </slot>

    <van-picker
      v-bind="pickerAttrs"
      ref="pickerRef"
      :columns="filteredColumns"
      @update:model-value="$emit('update:modelValue', $event)"
      @confirm="confirm"
      @cancel="hide($event)"
      @change="$emit('change', $event)"
      @click-option="$emit('clickOption', $event)"
      @scroll-into="$emit('scrollInto', $event)"
    ></van-picker>
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
    type VroVanPickerEmits,
    type VroVanPickerProps,
    vroVanPickerProps,
    type VroVanPickerResult,
    type VroVanPickerSlots,
  } from './types'

  defineOptions({ name: 'VroVanPicker' })
  defineSlots<VroVanPickerSlots>()
  const emit = defineEmits<VroVanPickerEmits>()
  const props = defineProps(vroVanPickerProps)

  const { t } = useLocale()
  const pickerRef = useTemplateRef<PickerInstance>('pickerRef')
  const keyword = ref('')
  const dynamicProps = ref<Partial<VroVanPickerProps>>()

  const computedProps = computed<VroVanPickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const pickerAttrs = computed(() => pick(computedProps.value, typedKeys(pickerProps)))
  const popupAttrs = computed(() => ({
    round: true,
    position: 'bottom' as const,
    ...computedProps.value.popupProps,
  }))
  const filterInputPlaceholder = computed(
    () => computedProps.value.filterPlaceholder || t('picker.filterPlaceholder'),
  )
  const filteredColumns = computed(() => {
    const { columns } = computedProps.value
    const value = keyword.value.trim().toLowerCase()

    if (!computedProps.value.filterable || !value) {
      return columns
    }

    return filterColumns(columns as Array<PickerColumn | PickerOption>, value)
  })

  const { show, hide, confirm, visible } = useVisible<
    Partial<VroVanPickerProps>,
    VroVanPickerResult
  >({
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

  const setKeyword = (value: string) => {
    keyword.value = value
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

  defineExpose({
    show,
    hide,
    confirm,
    get picker() {
      return pickerRef.value!
    },
  })
</script>
