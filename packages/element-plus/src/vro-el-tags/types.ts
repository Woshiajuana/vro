import type { ExtractPropTypes, PropType } from 'vue'

export const vroElTagsProps = {
  /**
   * 标签列表。
   */
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * 是否禁用新增和删除标签。
   */
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type VroElTagsProps = ExtractPropTypes<typeof vroElTagsProps>
