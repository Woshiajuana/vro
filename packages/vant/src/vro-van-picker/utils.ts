import { isArray, isEmpty } from '@daysnap/utils'
import type { PickerColumn, PickerConfirmEventParams, PickerFieldNames, PickerOption } from 'vant'

import { VRO_VAN_PICKER_NO_DATA_VALUE, type VroVanPickerResult } from './types'

export type VroVanPickerColumns = Array<PickerColumn | PickerOption>

export const createVroVanPickerResult = (params: PickerConfirmEventParams): VroVanPickerResult => {
  return {
    ...params,
    value: params.selectedValues.length === 1 ? params.selectedValues[0] : params.selectedValues,
  }
}

export const getVroVanPickerModelValue = (
  modelValue: unknown | unknown[],
  fieldNames?: PickerFieldNames,
) => {
  if (isEmpty(modelValue)) {
    return []
  }

  return (isArray(modelValue) ? modelValue : [modelValue]).map((item) =>
    isVroVanPickerOption(item, fieldNames) ? getVroVanPickerOptionValue(item, fieldNames) : item,
  )
}

export const createVroVanPickerNoDataOption = (
  text: string,
  fieldNames?: PickerFieldNames,
): PickerOption => {
  return {
    [getVroVanPickerFieldName('text', fieldNames)]: text,
    [getVroVanPickerFieldName('value', fieldNames)]: VRO_VAN_PICKER_NO_DATA_VALUE,
  }
}

export const filterVroVanPickerColumns = (
  columns: VroVanPickerColumns,
  value: string,
  fieldNames?: PickerFieldNames,
) => {
  if (isVroVanPickerColumnGroup(columns)) {
    return columns.map((column) => filterVroVanPickerOptions(column, value, fieldNames))
  }

  return filterVroVanPickerOptions(columns as PickerColumn, value, fieldNames)
}

export const hasVroVanPickerColumnsData = (columns: VroVanPickerColumns) => {
  if (!columns.length) {
    return false
  }

  if (isVroVanPickerColumnGroup(columns)) {
    return columns.every((column) => column.length)
  }

  return true
}

export const isVroVanPickerNoDataResult = (
  params: PickerConfirmEventParams,
  fieldNames?: PickerFieldNames,
) => {
  return (
    params.selectedValues.includes(VRO_VAN_PICKER_NO_DATA_VALUE) ||
    params.selectedOptions.some(
      (option) => getVroVanPickerOptionValue(option, fieldNames) === VRO_VAN_PICKER_NO_DATA_VALUE,
    )
  )
}

export const getVroVanPickerOptionValue = (
  option?: PickerOption,
  fieldNames?: PickerFieldNames,
) => {
  return option?.[getVroVanPickerFieldName('value', fieldNames)]
}

export const getVroVanPickerFieldName = (
  name: keyof PickerFieldNames,
  fieldNames?: PickerFieldNames,
) => {
  return fieldNames?.[name] ?? name
}

export const isVroVanPickerOption = (
  value: unknown,
  fieldNames?: PickerFieldNames,
): value is PickerOption => {
  return (
    value !== null &&
    typeof value === 'object' &&
    getVroVanPickerFieldName('value', fieldNames) in value
  )
}

const filterVroVanPickerOptions = (
  options: PickerColumn,
  value: string,
  fieldNames?: PickerFieldNames,
): PickerColumn => {
  const text = getVroVanPickerFieldName('text', fieldNames)
  const children = getVroVanPickerFieldName('children', fieldNames)

  return options
    .map((option) => {
      const childOptions = option[children] as PickerColumn | undefined
      const matched = `${option[text] ?? ''}`.toLowerCase().includes(value)

      if (matched) {
        return option
      }

      const filteredChildren = childOptions
        ? filterVroVanPickerOptions(childOptions, value, fieldNames)
        : undefined

      if (!filteredChildren?.length) {
        return
      }

      return { ...option, [children]: filteredChildren }
    })
    .filter(Boolean) as PickerColumn
}

const isVroVanPickerColumnGroup = (columns: VroVanPickerColumns): columns is PickerColumn[] => {
  return Array.isArray(columns[0])
}
