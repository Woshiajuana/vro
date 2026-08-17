import type { ExtractPropTypes, PropType } from 'vue'

import type { VroVanNavbarProps } from '../vro-van-navbar'

export const vroVanViewProps = {
  navbarProps: Object as PropType<Partial<VroVanNavbarProps>>,
}

export type VroVanViewProps = ExtractPropTypes<typeof vroVanViewProps>
