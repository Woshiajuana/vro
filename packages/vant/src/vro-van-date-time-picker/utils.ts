import { formatDate, normalizeDate } from '@daysnap/utils'
import type { PickerColumn, PickerConfirmEventParams, PickerOption } from 'vant'

import type { VroVanDateTimePickerColumnType, VroVanDateTimePickerResult } from './types'

export interface VroVanDateTimePickerUtilsOptions {
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

type DateTimePickerModelValue = string | number | Date | undefined

const tokenMap: Record<VroVanDateTimePickerColumnType, string> = {
  year: 'yyyy',
  month: 'MM',
  day: 'dd',
  hour: 'hh',
  minute: 'mm',
  second: 'ss',
}

export const normalizeDateTimePickerFormat = (format: string) => {
  return format.replace(/H/g, 'h')
}

export const getDateTimePickerColumnTypes = (format: string): VroVanDateTimePickerColumnType[] => {
  const types: VroVanDateTimePickerColumnType[] = []

  if (/y+/.test(format)) types.push('year')
  if (/M+/.test(format)) types.push('month')
  if (/d+/.test(format)) types.push('day')
  if (/h+/.test(format)) types.push('hour')
  if (/m+/.test(format)) types.push('minute')
  if (/s+/.test(format)) types.push('second')

  return types.length ? types : ['year', 'month', 'day']
}

export const createDateTimePickerColumns = (
  columnTypes: VroVanDateTimePickerColumnType[],
  selectedDate: Date,
  options: VroVanDateTimePickerUtilsOptions,
): PickerColumn => {
  return columnTypes.map((type) => createDateTimePickerColumn(type, selectedDate, options))
}

export const createDateTimePickerResult = (
  params: PickerConfirmEventParams,
  columnTypes: VroVanDateTimePickerColumnType[],
  modelValue: DateTimePickerModelValue,
  options: VroVanDateTimePickerUtilsOptions,
): VroVanDateTimePickerResult => {
  const date = getDateTimePickerDateByValues(
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

export const createDateTimePickerColumn = (
  type: VroVanDateTimePickerColumnType,
  selectedDate: Date,
  options: VroVanDateTimePickerUtilsOptions,
): PickerOption[] => {
  const [min, max] = getDateTimePickerColumnRange(type, selectedDate, options)

  return Array.from({ length: max - min + 1 }, (_, index) => {
    const value = `${type === 'year' ? min + index : padZero(min + index)}`
    return { text: value, value }
  })
}

export const getDateTimePickerColumnRange = (
  type: VroVanDateTimePickerColumnType,
  selectedDate: Date,
  options: VroVanDateTimePickerUtilsOptions,
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

export const getDateTimePickerModelDate = (
  value: DateTimePickerModelValue,
  columnTypes: VroVanDateTimePickerColumnType[],
  options: VroVanDateTimePickerUtilsOptions,
) => {
  const date =
    value == null || value === ''
      ? new Date()
      : typeof value === 'string'
        ? normalizeDateTimePickerValue(value, columnTypes, options)
        : normalizeDate(value)

  return clampDate(Number.isNaN(date.getTime()) ? new Date() : date, options)
}

export const getDateTimePickerSelectedDate = (
  pickerValue: unknown[],
  columnTypes: VroVanDateTimePickerColumnType[],
  modelValue: DateTimePickerModelValue,
  options: VroVanDateTimePickerUtilsOptions,
) => {
  return getDateTimePickerDateByValues(pickerValue, columnTypes, modelValue, options)
}

export const getDateTimePickerDateByValues = (
  values: unknown[],
  columnTypes: VroVanDateTimePickerColumnType[],
  modelValue: DateTimePickerModelValue,
  options: VroVanDateTimePickerUtilsOptions,
) => {
  return getDateTimePickerDate(
    values,
    columnTypes,
    getDateTimePickerModelDate(modelValue, columnTypes, options),
    options,
  )
}

export const getDateTimePickerDate = (
  values: unknown[],
  columnTypes: VroVanDateTimePickerColumnType[],
  baseDate: Date,
  options: VroVanDateTimePickerUtilsOptions,
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

export const getDateTimePickerValues = (
  date: Date,
  columnTypes: VroVanDateTimePickerColumnType[],
) => {
  const parts = getDateParts(date)

  return columnTypes.map((type) => {
    return type === 'year' ? `${parts[type]}` : padZero(parts[type])
  })
}

export const getDateTimePickerValuesByModelValue = (
  modelValue: DateTimePickerModelValue,
  columnTypes: VroVanDateTimePickerColumnType[],
  options: VroVanDateTimePickerUtilsOptions,
) => {
  return getDateTimePickerValues(
    getDateTimePickerModelDate(modelValue, columnTypes, options),
    columnTypes,
  )
}

export const formatDateTimePickerValue = (
  values: unknown[],
  columnTypes: VroVanDateTimePickerColumnType[],
  baseDate: Date,
  options: VroVanDateTimePickerUtilsOptions,
) => {
  return formatDate(getDateTimePickerDate(values, columnTypes, baseDate, options), options.format)
}

export const formatDateTimePickerSelectedValue = (
  values: unknown[],
  columnTypes: VroVanDateTimePickerColumnType[],
  modelValue: DateTimePickerModelValue,
  options: VroVanDateTimePickerUtilsOptions,
) => {
  return formatDateTimePickerValue(
    values,
    columnTypes,
    getDateTimePickerModelDate(modelValue, columnTypes, options),
    options,
  )
}

export const getMinDate = (options: VroVanDateTimePickerUtilsOptions) => {
  const year = new Date().getFullYear()
  return options.min ?? new Date(year - 10, 0, 1, 0, 0, 0)
}

export const getMaxDate = (options: VroVanDateTimePickerUtilsOptions) => {
  const year = new Date().getFullYear()
  return options.max ?? new Date(year + 10, 11, 31, 23, 59, 59)
}

export const clampDate = (date: Date, options: VroVanDateTimePickerUtilsOptions) => {
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

const normalizeDateTimePickerValue = (
  value: string,
  columnTypes: VroVanDateTimePickerColumnType[],
  options: VroVanDateTimePickerUtilsOptions,
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
