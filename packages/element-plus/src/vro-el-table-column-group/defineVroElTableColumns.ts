import { isFunction } from '@daysnap/utils'

import type { VroElTableColumnGroupColumns } from './types'

export function defineVroElTableColumns<T extends Record<string, any> = any>(
  columns: VroElTableColumnGroupColumns<T> | (() => VroElTableColumnGroupColumns<T>),
) {
  return isFunction(columns) ? columns() : columns
}
