import type { ExtractPropTypes } from 'vue'

export const vroVanPickerHeaderProps = {
  title: String,
  cancelText: String,
  showCancelButton: Boolean,
  confirmText: String,
  showConfirmButton: Boolean,
}

export type VroVanPickerHeaderProps = ExtractPropTypes<typeof vroVanPickerHeaderProps>
