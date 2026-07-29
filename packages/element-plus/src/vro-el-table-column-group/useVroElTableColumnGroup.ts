import { isFunction } from '@daysnap/utils'
import { reactive } from 'vue'

import type { VroElTableColumnGroupColumns } from './types'

export function useVroElTableColumnGroup<T extends Record<string, any> = any>(
  rawColumns: VroElTableColumnGroupColumns<T> | (() => VroElTableColumnGroupColumns<T>),
) {
  return reactive(
    isFunction(rawColumns) ? rawColumns() : rawColumns,
  ) as VroElTableColumnGroupColumns<T>
}
