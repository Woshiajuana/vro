import { reactive } from 'vue'

import { defineVroElTableColumns } from './defineVroElTableColumns'
import type { VroElTableColumnGroupColumns } from './types'

export function useVroElTableColumnGroup<T extends Record<string, any> = any>(
  columns: VroElTableColumnGroupColumns<T> | (() => VroElTableColumnGroupColumns<T>),
) {
  return reactive<VroElTableColumnGroupColumns<T>>(defineVroElTableColumns(columns))
}
