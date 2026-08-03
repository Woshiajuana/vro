import { actionSheetProps } from 'vant'
import type { ExtractPropTypes } from 'vue'

export const vroVanActionSheetProps = {
  ...actionSheetProps,
}

export type VroVanActionSheetProps = ExtractPropTypes<typeof vroVanActionSheetProps>
