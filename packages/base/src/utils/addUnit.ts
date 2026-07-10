import { isNumeric } from '@daysnap/utils'

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value && value !== 0) return ''
  if (isNumeric(value)) {
    return `${value}${defaultUnit}`
  }
  return value
}
