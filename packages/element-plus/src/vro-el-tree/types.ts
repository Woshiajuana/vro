import type { ExtractPropTypes, PropType } from 'vue'

export const vroElTreeProps = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  rootId: {
    type: [String, Number],
    default: '-1',
  },
}

export type VroElTreeProps = ExtractPropTypes<typeof vroElTreeProps>
