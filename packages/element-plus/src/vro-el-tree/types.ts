import type { VroSlot } from '@vrojs/base'
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

/**
 * 组件内部使用的 ElTree 实例引用类型。
 *
 * 只声明实际用到的方法，而不是整个 ElTree 实例类型，
 * 避免 ElTree 的完整实例类型被内联进类型声明产物。
 */
export interface VroElTreeRef {
  /**
   * 设置选中的节点 id 列表。
   */
  setCheckedKeys: (keys: VroElTreeKey[]) => void
}

export const vroElTreeProps = {
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
  options: Array as PropType<VroElTreeOption[]>,

  /**
   * 树节点数据，兼容 el-tree 的 data，options 优先。
   */
  data: Array as PropType<VroElTreeOption[]>,

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
