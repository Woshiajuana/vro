import type { ExtractPropTypes, PropType } from 'vue'

import { elTableColumnProps } from '../utils'

export interface VroElTableActionsColumnAction<T = any> {
  label: string
  icon?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  disabled?: boolean
  loading?: boolean
  hidden?: (row: T, index: number) => boolean
  onAction?: (row: any, index: number) => any
}

export const vroElTableActionsColumnProps = {
  ...elTableColumnProps,
  label: {
    type: String,
    default: '操作',
  },
  actions: {
    type: Array as PropType<VroElTableActionsColumnAction[]>,
    default: () => [],
  },
  moreTrigger: String as PropType<'hover' | 'click' | 'contextmenu'>,
  moreActions: {
    type: Array as PropType<VroElTableActionsColumnAction[]>,
    default: () => [],
  },
}

export type VroElTableActionsColumnProps = ExtractPropTypes<typeof vroElTableActionsColumnProps>
