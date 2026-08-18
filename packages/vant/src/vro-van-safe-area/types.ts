import type { ExtractPropTypes } from 'vue'

export const vroVanSafeAreaProps = {
  top: Boolean,
  bottom: Boolean,
  left: Boolean,
  right: Boolean,
}

export type VroVanSafeAreaProps = ExtractPropTypes<typeof vroVanSafeAreaProps>
