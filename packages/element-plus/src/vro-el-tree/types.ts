import type { VroSlot } from '@vrojs/base'
import { treeProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroElTreeKey = string | number
export type VroElTreeModelValue = VroElTreeKey[]

export interface VroElTreeOption {
  id: VroElTreeKey
  parentId?: VroElTreeKey
  children?: VroElTreeOption[]
  [key: string]: any
}

export interface VroElTreeNode {
  label?: string
  level?: number
  checked?: boolean
  indeterminate?: boolean
  expanded?: boolean
  disabled?: boolean
  isLeaf?: boolean
  [key: string]: any
}

export interface VroElTreeDefaultSlotProps {
  node: VroElTreeNode
  data: VroElTreeOption
  store: unknown
}

export interface VroElTreeCheckInfo {
  checkedKeys: VroElTreeModelValue
  halfCheckedKeys: VroElTreeModelValue
}

export interface VroElTreeEmits {
  'update:modelValue': [value: VroElTreeModelValue]
  check: [data: VroElTreeOption, info: VroElTreeCheckInfo]
}

export const vroElTreeProps = {
  ...treeProps,

  /**
   * 选中的节点 id 列表，包含半选和全选节点。
   */
  modelValue: {
    type: Array as PropType<VroElTreeModelValue>,
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

  /**
   * 节点唯一标识字段。
   */
  nodeKey: {
    type: String,
    default: 'id',
  },
}

export type VroElTreeProps = ExtractPropTypes<typeof vroElTreeProps>

export interface VroElTreeSlots {
  /**
   * 自定义节点内容。
   */
  default?: (props: VroElTreeDefaultSlotProps) => any

  /**
   * 自定义空数据内容。
   */
  empty?: VroSlot
}
