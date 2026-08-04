<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-picker"
    :show="visible"
    @click-overlay="hide('cancel')"
    @click-close-icon="hide('cancel')"
    @closed="$emit('closed')"
  >
    <van-picker
      v-bind="pickerProps"
      ref="vanPickerRef"
      :columns="filteredColumns"
      :model-value="pickerModelValue"
      @confirm="handleConfirm"
      @cancel="hide('cancel')"
    ></van-picker>

    <input
      v-if="computedProps.filterable"
      v-model="keyword"
      :placeholder="computedProps.filterPlaceholder || t('picker.filterPlaceholder')"
      autocomplete="off"
      class="vro-van-picker-filter"
      enterkeyhint="search"
      type="text"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useVisible } from '@vrojs/use'
  import type { PickerConfirmEventParams, PickerInstance, PickerOption } from 'vant'
  import { Picker as VanPicker, pickerProps as vanPickerProps, Popup as VanPopup } from 'vant'
  import { computed, ref, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import {
    type VroVanPickerEmits,
    type VroVanPickerProps,
    vroVanPickerProps,
    type VroVanPickerResult,
  } from './types'
  import {
    createVroVanPickerNoDataOption,
    createVroVanPickerResult,
    filterVroVanPickerColumns,
    getVroVanPickerModelValue,
    hasVroVanPickerColumnsData,
    isVroVanPickerNoDataResult,
    type VroVanPickerColumns,
  } from './utils'

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
  const pickerProps = computed(() => pick(computedProps.value, typedKeys(vanPickerProps)))
  const pickerModelValue = computed(() =>
    getVroVanPickerModelValue(
      computedProps.value.modelValue,
      computedProps.value.columnsFieldNames,
    ),
  )
  const noDataOption = computed<PickerOption>(() => {
    return createVroVanPickerNoDataOption(
      t('picker.emptyText'),
      computedProps.value.columnsFieldNames,
    )
  })

  const filteredColumns = computed(() => {
    const { columns } = computedProps.value
    const value = keyword.value.trim().toLowerCase()
    const result =
      computedProps.value.filterable && value
        ? filterVroVanPickerColumns(
            columns as VroVanPickerColumns,
            value,
            computedProps.value.columnsFieldNames,
          )
        : columns

    return hasVroVanPickerColumnsData(result as VroVanPickerColumns) ? result : [noDataOption.value]
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
      const result = createVroVanPickerResult(params)

      emit('confirm', result)
      return result
    },
  })

  const handleConfirm = (params: PickerConfirmEventParams) => {
    if (isVroVanPickerNoDataResult(params, computedProps.value.columnsFieldNames)) {
      hide('cancel')
      return
    }

    confirmPicker(params)
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
