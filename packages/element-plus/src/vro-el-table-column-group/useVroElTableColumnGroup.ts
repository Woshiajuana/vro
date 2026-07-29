import { isFunction } from '@daysnap/utils'
import { reactive } from 'vue'

import type { VroElTableColumnGroupColumns } from './types'

export function useVroElTableColumnGroup(rawColumns: VroElTableColumnGroupColumns) {
  return reactive(isFunction(rawColumns) ? rawColumns() : rawColumns)
}
