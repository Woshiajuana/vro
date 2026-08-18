import type { ExtractPropTypes } from 'vue'

export const vroSafeAreaProps = {
  top: Boolean,
  bottom: Boolean,
  left: Boolean,
  right: Boolean,
}

export type VroSafeAreaProps = ExtractPropTypes<typeof vroSafeAreaProps>
