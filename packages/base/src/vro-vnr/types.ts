import type { ExtractPropTypes, PropType, VNode } from 'vue'

export const vroVnrProps = {
  nodes: {
    type: Array as PropType<VNode[]>,
    default: () => [],
  },
}

export type VroVnrProps = ExtractPropTypes<typeof vroVnrProps>
