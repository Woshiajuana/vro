<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-datetime-picker"
    :show="visible"
    @click-overlay="hide('cancel')"
    @click-close-icon="hide('cancel')"
    @closed="$emit('closed')"
  >
    <van-picker
      v-bind="pickerProps"
      ref="vanPickerRef"
      :columns="columns"
      :model-value="pickerValue"
      @confirm="handleConfirm"
      @cancel="hide('cancel')"
    >
      <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </van-picker>
  </van-popup>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useVisible } from '@vrojs/use'
  import type { PickerColumn, PickerConfirmEventParams, PickerInstance } from 'vant'
  import { Picker as VanPicker, pickerProps as vanPickerProps, Popup as VanPopup } from 'vant'
  import { computed, ref, useTemplateRef } from 'vue'

  import {
    type VroVanDatetimePickerEmits,
    type VroVanDatetimePickerProps,
    vroVanDatetimePickerProps,
    type VroVanDatetimePickerResult,
    type VroVanDatetimePickerSlots,
  } from './types'
  import {
    createDatetimePickerColumns,
    createDatetimePickerResult,
    getDatetimePickerColumnTypes,
    getDatetimePickerSelectedDate,
    getDatetimePickerValuesByModelValue,
    normalizeDatetimePickerFormat,
  } from './utils'

  defineOptions({ name: 'VroVanDatetimePicker' })

  const slots = defineSlots<VroVanDatetimePickerSlots>()
  const emit = defineEmits<VroVanDatetimePickerEmits>()
  const props = defineProps(vroVanDatetimePickerProps)

  const vanPickerRef = useTemplateRef<PickerInstance>('vanPickerRef')

  const dynamicProps = ref<Partial<VroVanDatetimePickerProps>>()

  const computedProps = computed<VroVanDatetimePickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const pickerProps = computed(() => pick(computedProps.value, typedKeys(vanPickerProps)))
  const normalizedFormat = computed(() => normalizeDatetimePickerFormat(computedProps.value.format))
  const utilsOptions = computed(() => ({
    format: normalizedFormat.value,
    min: computedProps.value.min,
    max: computedProps.value.max,
  }))
  const columnTypes = computed(() => getDatetimePickerColumnTypes(normalizedFormat.value))
  const pickerValue = computed(() =>
    getDatetimePickerValuesByModelValue(
      computedProps.value.modelValue,
      columnTypes.value,
      utilsOptions.value,
    ),
  )
  const columns = computed<PickerColumn>(() =>
    createDatetimePickerColumns(
      columnTypes.value,
      getDatetimePickerSelectedDate(
        pickerValue.value,
        columnTypes.value,
        computedProps.value.modelValue,
        utilsOptions.value,
      ),
      utilsOptions.value,
    ),
  )

  const {
    show,
    hide,
    confirm: confirmPicker,
    visible,
  } = useVisible<Partial<VroVanDatetimePickerProps>, VroVanDatetimePickerResult>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => {
      emit('cancel', reason)
    },
    confirmCallback: (result: VroVanDatetimePickerResult) => {
      emit('confirm', result)
      return result
    },
  })

  const handleConfirm = (params: PickerConfirmEventParams) => {
    confirmPicker(
      createDatetimePickerResult(
        params,
        columnTypes.value,
        computedProps.value.modelValue,
        utilsOptions.value,
      ),
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
