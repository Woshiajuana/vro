import type { VroSlot } from '@vrojs/base'
import type { ButtonProps, InputProps, TagProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export type VroElTagsModelValue = string[]

export interface VroElTagsSlotProps {
  item: string
  index: number
}

export interface VroElTagsEmits {
  'update:modelValue': [value: VroElTagsModelValue]
}

export const vroElTagsProps = {
  /**
   * 标签列表。
   */
  modelValue: {
    type: Array as PropType<VroElTagsModelValue>,
    default: () => [],
  },

  /**
   * 是否禁用新增和删除标签。
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 最大标签数量。
   */
  max: Number,

  /**
   * 透传给 ElTag 的属性。
   */
  tagProps: Object as PropType<Partial<TagProps>>,

  /**
   * 透传给 ElInput 的属性。
   */
  inputProps: Object as PropType<Partial<InputProps>>,

  /**
   * 透传给 ElButton 的属性。
   */
  buttonProps: Object as PropType<Partial<ButtonProps>>,
}

export type VroElTagsProps = ExtractPropTypes<typeof vroElTagsProps>

export interface VroElTagsSlots {
  /**
   * 自定义标签内容。
   */
  tag?: (props: VroElTagsSlotProps) => any

  /**
   * 自定义新增按钮内容。
   */
  add?: VroSlot
}
