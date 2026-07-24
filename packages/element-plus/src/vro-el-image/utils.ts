import { createFactory } from '@daysnap/utils'

import type { VroElImageProps } from './types'

export const [setVroElImageOptions, getVroElImageOptions] = createFactory<
  Partial<Pick<VroElImageProps, 'normalizeSrc' | 'baseUrl' | 'loadingProps' | 'iconProps'>>
>({})
