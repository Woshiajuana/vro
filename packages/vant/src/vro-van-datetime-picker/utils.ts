import { formatDate, normalizeDate } from '@daysnap/utils'
import type { PickerColumn, PickerConfirmEventParams, PickerOption } from 'vant'

import type { VroVanDatetimePickerColumnType, VroVanDatetimePickerResult } from './types'

export interface VroVanDatetimePickerUtilsOptions {
  format: string
  min?: Date
  max?: Date
}

interface DateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

type DatetimePickerModelValue = string | number | Date | undefined

const tokenMap: Record<VroVanDatetimePickerColumnType, string> = {
  year: 'yyyy',
  month: 'MM',
  day: 'dd',
  hour: 'hh',
  minute: 'mm',
  second: 'ss',
}

export const normalizeDatetimePickerFormat = (format: string) => {
  return format.replace(/H/g, 'h')
}

export const getDatetimePickerColumnTypes = (format: string): VroVanDatetimePickerColumnType[] => {
  const types: VroVanDatetimePickerColumnType[] = []

  if (/y+/.test(format)) types.push('year')
  if (/M+/.test(format)) types.push('month')
  if (/d+/.test(format)) types.push('day')
  if (/h+/.test(format)) types.push('hour')
  if (/m+/.test(format)) types.push('minute')
  if (/s+/.test(format)) types.push('second')

  return types.length ? types : ['year', 'month', 'day']
}

export const createDatetimePickerColumns = (
  columnTypes: VroVanDatetimePickerColumnType[],
  selectedDate: Date,
  options: VroVanDatetimePickerUtilsOptions,
): PickerColumn => {
  return columnTypes.map((type) => createDatetimePickerColumn(type, selectedDate, options))
}

export const createDatetimePickerResult = (
  params: PickerConfirmEventParams,
  columnTypes: VroVanDatetimePickerColumnType[],
  modelValue: DatetimePickerModelValue,
  options: VroVanDatetimePickerUtilsOptions,
): VroVanDatetimePickerResult => {
  const date = getDatetimePickerDateByValues(
    params.selectedValues,
    columnTypes,
    modelValue,
    options,
  )

  return {
    ...params,
    value: formatDate(date, options.format),
    date,
  }
}

export const createDatetimePickerColumn = (
  type: VroVanDatetimePickerColumnType,
  selectedDate: Date,
  options: VroVanDatetimePickerUtilsOptions,
): PickerOption[] => {
  const [min, max] = getDatetimePickerColumnRange(type, selectedDate, options)

  return Array.from({ length: max - min + 1 }, (_, index) => {
    const value = `${type === 'year' ? min + index : padZero(min + index)}`
    return { text: value, value }
  })
}

export const getDatetimePickerColumnRange = (
  type: VroVanDatetimePickerColumnType,
  selectedDate: Date,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  const min = getMinDate(options)
  const max = getMaxDate(options)
  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

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

export const getDatetimePickerModelDate = (
  value: DatetimePickerModelValue,
  columnTypes: VroVanDatetimePickerColumnType[],
  options: VroVanDatetimePickerUtilsOptions,
) => {
  const date =
    value == null || value === ''
      ? new Date()
      : typeof value === 'string'
        ? normalizeDatetimePickerValue(value, columnTypes, options)
        : normalizeDate(value)

  return clampDate(Number.isNaN(date.getTime()) ? new Date() : date, options)
}

export const getDatetimePickerSelectedDate = (
  pickerValue: unknown[],
  columnTypes: VroVanDatetimePickerColumnType[],
  modelValue: DatetimePickerModelValue,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  return getDatetimePickerDateByValues(pickerValue, columnTypes, modelValue, options)
}

export const getDatetimePickerDateByValues = (
  values: unknown[],
  columnTypes: VroVanDatetimePickerColumnType[],
  modelValue: DatetimePickerModelValue,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  return getDatetimePickerDate(
    values,
    columnTypes,
    getDatetimePickerModelDate(modelValue, columnTypes, options),
    options,
  )
}

export const getDatetimePickerDate = (
  values: unknown[],
  columnTypes: VroVanDatetimePickerColumnType[],
  baseDate: Date,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  const parts = getDateParts(baseDate)

  columnTypes.forEach((type, index) => {
    const value = Number(values[index])

    if (!Number.isNaN(value)) {
      parts[type] = value
    }
  })

  return clampDate(createDate(parts), options)
}

export const getDatetimePickerValues = (
  date: Date,
  columnTypes: VroVanDatetimePickerColumnType[],
) => {
  const parts = getDateParts(date)

  return columnTypes.map((type) => {
    return type === 'year' ? `${parts[type]}` : padZero(parts[type])
  })
}

export const getDatetimePickerValuesByModelValue = (
  modelValue: DatetimePickerModelValue,
  columnTypes: VroVanDatetimePickerColumnType[],
  options: VroVanDatetimePickerUtilsOptions,
) => {
  return getDatetimePickerValues(
    getDatetimePickerModelDate(modelValue, columnTypes, options),
    columnTypes,
  )
}

export const formatDatetimePickerValue = (
  values: unknown[],
  columnTypes: VroVanDatetimePickerColumnType[],
  baseDate: Date,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  return formatDate(getDatetimePickerDate(values, columnTypes, baseDate, options), options.format)
}

export const formatDatetimePickerSelectedValue = (
  values: unknown[],
  columnTypes: VroVanDatetimePickerColumnType[],
  modelValue: DatetimePickerModelValue,
  options: VroVanDatetimePickerUtilsOptions,
) => {
  return formatDatetimePickerValue(
    values,
    columnTypes,
    getDatetimePickerModelDate(modelValue, columnTypes, options),
    options,
  )
}

export const getMinDate = (options: VroVanDatetimePickerUtilsOptions) => {
  const year = new Date().getFullYear()
  return options.min ?? new Date(year - 10, 0, 1, 0, 0, 0)
}

export const getMaxDate = (options: VroVanDatetimePickerUtilsOptions) => {
  const year = new Date().getFullYear()
  return options.max ?? new Date(year + 10, 11, 31, 23, 59, 59)
}

export const clampDate = (date: Date, options: VroVanDatetimePickerUtilsOptions) => {
  const min = getMinDate(options)
  const max = getMaxDate(options)

  if (date < min) return new Date(min)
  if (date > max) return new Date(max)
  return new Date(date)
}

export const getMonthEndDay = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

export const padZero = (value: number) => {
  return `${value}`.padStart(2, '0')
}

const normalizeDatetimePickerValue = (
  value: string,
  columnTypes: VroVanDatetimePickerColumnType[],
  options: VroVanDatetimePickerUtilsOptions,
) => {
  const parsedDate = normalizeDate(value)

  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate
  }

  const parts = getDateParts(new Date())

  columnTypes.forEach((type) => {
    const token = tokenMap[type]
    const start = options.format.indexOf(token)
    const text = start === -1 ? '' : value.slice(start, start + token.length)
    const number = Number(text)

    if (!Number.isNaN(number)) {
      parts[type] = number
    }
  })

  return createDate(parts)
}

const getDateParts = (date: Date): DateParts => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

const createDate = (parts: DateParts) => {
  return new Date(
    parts.year,
    parts.month - 1,
    Math.min(parts.day, getMonthEndDay(parts.year, parts.month - 1)),
    parts.hour,
    parts.minute,
    parts.second,
  )
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
