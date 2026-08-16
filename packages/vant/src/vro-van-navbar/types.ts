import type { ExtractPropTypes } from 'vue'

export const vroVanNavbarProps = {
  leftArrow: {
    type: Boolean,
    default: true,
  },
  safeAreaInsetTop: Boolean,
  border: Boolean,
  fixed: Boolean,
  placeholder: Boolean,
  title: String,
}

export type VroVanNavbarProps = ExtractPropTypes<typeof vroVanNavbarProps>
