import type { ExtractPropTypes, PropType, Raw } from 'vue'

type PartialTableColumn<T, P> = Partial<P> & {
  is: T
  props?: Partial<P>
  hidden?: boolean | (() => boolean)
}

export interface VroElCustomTableColumn {
  is: Raw<object>
  //  | (string & {})
  prop?: string
  props?: Record<string, any>
  hidden?: boolean | (() => boolean)
  [key: string]: any
}

export type VroElTableColumnGroupColumn = VroElCustomTableColumn

export const vroElTableColumnGroupProps = {
  columns: {
    type: Array as PropType<VroElTableColumnGroupColumn[]>,
    default: () => [],
  },
}

export type VroElTableColumnGroupProps = ExtractPropTypes<typeof vroElTableColumnGroupProps>
