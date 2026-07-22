import type { ExtractPropTypes } from 'vue'

export const vroVanCellGroupProps = {
  title: String,
  inset: Boolean,
  border: Boolean,
}

export type VroVanCellGroupProps = ExtractPropTypes<typeof vroVanCellGroupProps>
