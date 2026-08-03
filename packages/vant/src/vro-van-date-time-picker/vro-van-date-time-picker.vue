<template>
  <van-popup
    round
    position="bottom"
    v-bind="computedProps.popupProps"
    class="vro-van-date-time-picker"
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
      @update:model-value="handleUpdateModelValue"
      @confirm="handleConfirm"
      @cancel="hide('cancel')"
      @change="$emit('change', $event)"
    >
      <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </van-picker>
  </van-popup>
</template>

<script setup lang="ts">
  import { formatDate, parseDate, pick, typedKeys } from '@daysnap/utils'
  import { useVisible } from '@vrojs/use'
  import type { PickerColumn, PickerConfirmEventParams, PickerInstance, PickerOption } from 'vant'
  import { Picker as VanPicker, pickerProps as vanPickerProps, Popup as VanPopup } from 'vant'
  import { computed, ref, useTemplateRef, watch } from 'vue'

  import {
    type VroVanDateTimePickerColumnType,
    type VroVanDateTimePickerEmits,
    type VroVanDateTimePickerProps,
    vroVanDateTimePickerProps,
    type VroVanDateTimePickerResult,
    type VroVanDateTimePickerSlots,
  } from './types'

  defineOptions({ name: 'VroVanDateTimePicker' })

  const slots = defineSlots<VroVanDateTimePickerSlots>()
  const emit = defineEmits<VroVanDateTimePickerEmits>()
  const props = defineProps(vroVanDateTimePickerProps)

  const vanPickerRef = useTemplateRef<PickerInstance>('vanPickerRef')

  const dynamicProps = ref<Partial<VroVanDateTimePickerProps>>()
  const pickerValue = ref<string[]>([])

  const computedProps = computed<VroVanDateTimePickerProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const pickerProps = computed(() => pick(computedProps.value, typedKeys(vanPickerProps)))
  const normalizedFormat = computed(() => computedProps.value.format.replace(/H/g, 'h'))
  const columnTypes = computed<VroVanDateTimePickerColumnType[]>(() => {
    const format = normalizedFormat.value
    const types: VroVanDateTimePickerColumnType[] = []

    if (/y+/.test(format)) types.push('year')
    if (/M+/.test(format)) types.push('month')
    if (/d+/.test(format)) types.push('day')
    if (/h+/.test(format)) types.push('hour')
    if (/m+/.test(format)) types.push('minute')
    if (/s+/.test(format)) types.push('second')

    return types.length ? types : ['year', 'month', 'day']
  })
  const columns = computed<PickerColumn>(() =>
    columnTypes.value.map((type) => createColumn(type, getSelectedDate())),
  )

  const {
    show,
    hide,
    confirm: confirmPicker,
    visible,
  } = useVisible<Partial<VroVanDateTimePickerProps>, VroVanDateTimePickerResult>({
    showCallback: (options) => {
      dynamicProps.value = options
      pickerValue.value = getDateValues(getModelDate(options?.modelValue))
    },
    hideCallback: (reason) => {
      emit('cancel', reason)
    },
    confirmCallback: (result: VroVanDateTimePickerResult) => {
      emit('update:modelValue', result.value)
      emit('confirm', result)
      return result
    },
  })

  watch(
    () => computedProps.value.modelValue,
    (value) => {
      pickerValue.value = getDateValues(getModelDate(value))
    },
    { immediate: true },
  )

  const handleUpdateModelValue = (value: string[]) => {
    pickerValue.value = value
    emit('update:modelValue', formatSelectedDate(value))
  }

  const handleConfirm = (params: PickerConfirmEventParams) => {
    confirmPicker(createResult(params))
  }

  const createResult = (params: PickerConfirmEventParams): VroVanDateTimePickerResult => {
    const date = getDateByValues(params.selectedValues)

    return {
      ...params,
      value: formatSelectedDate(params.selectedValues),
      date,
    }
  }

  const createColumn = (
    type: VroVanDateTimePickerColumnType,
    selectedDate: Date,
  ): PickerOption[] => {
    const [min, max] = getColumnRange(type, selectedDate)

    return Array.from({ length: max - min + 1 }, (_, index) => {
      const value = `${type === 'year' ? min + index : padZero(min + index)}`
      return { text: value, value }
    })
  }

  const getColumnRange = (type: VroVanDateTimePickerColumnType, selectedDate: Date) => {
    const min = getMinDate()
    const max = getMaxDate()
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const day = selectedDate.getDate()
    const hour = selectedDate.getHours()
    const minute = selectedDate.getMinutes()

    switch (type) {
      case 'year':
        return [min.getFullYear(), max.getFullYear()]
      case 'month':
        return [
          year === min.getFullYear() ? min.getMonth() + 1 : 1,
          year === max.getFullYear() ? max.getMonth() + 1 : 12,
        ]
      case 'day':
        return [
          isSameMonth(selectedDate, min) ? min.getDate() : 1,
          isSameMonth(selectedDate, max) ? max.getDate() : getMonthEndDay(year, month),
        ]
      case 'hour':
        return [
          isSameDay(selectedDate, min) ? min.getHours() : 0,
          isSameDay(selectedDate, max) ? max.getHours() : 23,
        ]
      case 'minute':
        return [
          isSameHour(selectedDate, min) ? min.getMinutes() : 0,
          isSameHour(selectedDate, max) ? max.getMinutes() : 59,
        ]
      case 'second':
        return [
          isSameMinute(selectedDate, min) ? min.getSeconds() : 0,
          isSameMinute(selectedDate, max) ? max.getSeconds() : 59,
        ]
    }
  }

  const getModelDate = (value = computedProps.value.modelValue) => {
    const date =
      value == null || value === ''
        ? new Date()
        : typeof value === 'string'
          ? parseDateByFormat(value)
          : parseDate(value)

    return clampDate(Number.isNaN(date.getTime()) ? new Date() : date)
  }

  const getSelectedDate = () => {
    return getDateByValues(pickerValue.value)
  }

  const getDateByValues = (values: unknown[]) => {
    const baseDate = getModelDate()
    const parts = {
      year: baseDate.getFullYear(),
      month: baseDate.getMonth() + 1,
      day: baseDate.getDate(),
      hour: baseDate.getHours(),
      minute: baseDate.getMinutes(),
      second: baseDate.getSeconds(),
    }

    columnTypes.value.forEach((type, index) => {
      const value = Number(values[index])

      if (Number.isNaN(value)) {
        return
      }

      parts[type] = value
    })

    const date = new Date(
      parts.year,
      parts.month - 1,
      Math.min(parts.day, getMonthEndDay(parts.year, parts.month - 1)),
      parts.hour,
      parts.minute,
      parts.second,
    )

    return clampDate(date)
  }

  const getDateValues = (date: Date) => {
    return columnTypes.value.map((type) => {
      if (type === 'year') return `${date.getFullYear()}`
      if (type === 'month') return padZero(date.getMonth() + 1)
      if (type === 'day') return padZero(date.getDate())
      if (type === 'hour') return padZero(date.getHours())
      if (type === 'minute') return padZero(date.getMinutes())
      return padZero(date.getSeconds())
    })
  }

  const formatSelectedDate = (values: unknown[]) => {
    return formatDate(getDateByValues(values), normalizedFormat.value)
  }

  const parseDateByFormat = (value: string) => {
    const parsedDate = parseDate(value)

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate
    }

    const date = new Date()
    const tokenMap: Record<VroVanDateTimePickerColumnType, string> = {
      year: 'yyyy',
      month: 'MM',
      day: 'dd',
      hour: 'hh',
      minute: 'mm',
      second: 'ss',
    }

    columnTypes.value.forEach((type) => {
      const token = tokenMap[type]
      const start = normalizedFormat.value.indexOf(token)
      const text = start === -1 ? '' : value.slice(start, start + token.length)
      const number = Number(text)

      if (Number.isNaN(number)) {
        return
      }

      if (type === 'year') date.setFullYear(number)
      if (type === 'month') date.setMonth(number - 1)
      if (type === 'day') date.setDate(number)
      if (type === 'hour') date.setHours(number)
      if (type === 'minute') date.setMinutes(number)
      if (type === 'second') date.setSeconds(number)
    })

    return date
  }

  const getMinDate = () => {
    const year = new Date().getFullYear()
    return computedProps.value.min ?? new Date(year - 10, 0, 1, 0, 0, 0)
  }

  const getMaxDate = () => {
    const year = new Date().getFullYear()
    return computedProps.value.max ?? new Date(year + 10, 11, 31, 23, 59, 59)
  }

  const clampDate = (date: Date) => {
    const min = getMinDate()
    const max = getMaxDate()

    if (date < min) return new Date(min)
    if (date > max) return new Date(max)
    return new Date(date)
  }

  const getMonthEndDay = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const padZero = (value: number) => {
    return `${value}`.padStart(2, '0')
  }

  const isSameMonth = (date: Date, target: Date) => {
    return date.getFullYear() === target.getFullYear() && date.getMonth() === target.getMonth()
  }

  const isSameDay = (date: Date, target: Date) => {
    return isSameMonth(date, target) && date.getDate() === target.getDate()
  }

  const isSameHour = (date: Date, target: Date) => {
    return isSameDay(date, target) && date.getHours() === target.getHours()
  }

  const isSameMinute = (date: Date, target: Date) => {
    return isSameHour(date, target) && date.getMinutes() === target.getMinutes()
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
