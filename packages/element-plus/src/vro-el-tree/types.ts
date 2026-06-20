import type { ExtractPropTypes, PropType } from 'vue'

export type VroElTreeKey = string | number

export interface VroElTreeOption {
  id: VroElTreeKey
  parentId?: VroElTreeKey
  children?: VroElTreeOption[]
  [key: string]: any
}

export const vroElTreeProps = {
  /**
   * 选中的节点 id 列表，包含半选和全选节点。
   */
  modelValue: {
    type: Array as PropType<VroElTreeKey[]>,
    default: () => [],
  },

  /**
   * 树节点数据，节点需要包含 id，可通过 parentId 表示父级关系。
   */
  options: {
    type: Array as PropType<VroElTreeOption[]>,
    default: () => [],
  },

  /**
   * 根节点 id，用于判断顶层节点的选中链路。
   */
  rootId: {
    type: [String, Number],
    default: '-1',
  },
}

export type VroElTreeProps = ExtractPropTypes<typeof vroElTreeProps>
