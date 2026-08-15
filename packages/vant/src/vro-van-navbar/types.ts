import type { ExtractPropTypes } from 'vue'

export const vroVanNavbarProps = {
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
}

export type VroVanNavbarProps = ExtractPropTypes<typeof vroVanNavbarProps>
