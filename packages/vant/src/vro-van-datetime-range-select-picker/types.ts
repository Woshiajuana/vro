import type { ExtractPropTypes, PropType } from 'vue'

export const vroVanDatetimeRangeSelectPickerProps = {
  modelValue: Array as PropType<string[]>,

  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
}

export type VroVanDatetimeRangeSelectPickerProps = ExtractPropTypes<
  typeof vroVanDatetimeRangeSelectPickerProps
>
