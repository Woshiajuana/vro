import type { ExtractPropTypes, PropType } from 'vue'

export const vroElTagsProps = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type VroElTagsProps = ExtractPropTypes<typeof vroElTagsProps>
