import { isFunction } from '@daysnap/utils'
import { reactive } from 'vue'

import type { VroElTableColumnGroupColumn } from './types'

export function useVroElTableColumnGroup(
  rawColumns: (() => VroElTableColumnGroupColumn[]) | VroElTableColumnGroupColumn[],
) {
  return reactive(isFunction(rawColumns) ? rawColumns() : rawColumns)
}
