import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanDateTimePickerProps = {
  modelValue: String,

  min: Date as PropType<Date>,

  max: Date as PropType<Date>,

  // yyyy-MM-dd hh:mm:ss
  // 如果给的是 yyyy-MM 则是年月选择器
  // yyyy-MM-dd 则是 年月日选择器
  format: String,
}

export type VroVanDateTimePickerProps = ExtractPropTypes<typeof vroVanDateTimePickerProps>
