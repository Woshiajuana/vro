import { vroIconProps } from '@vrojs/base'
import type { ExtractPropTypes } from 'vue'

export const vroVanIconProps = {
  ...vroIconProps,
}

export type VroVanIconProps = ExtractPropTypes<typeof vroVanIconProps>
