import { createFactory } from '@daysnap/utils'

import type { VroVanImageProps } from './types'

export const [setVroVanImageOptions, getVroVanImageOptions] = createFactory<
  Partial<
    Pick<
      VroVanImageProps,
      | 'baseUrl'
      | 'loadingSrc'
      | 'normalizeSrc'
      | 'placeholder'
      | 'preview'
      | 'previewRatio'
      | 'ratio'
    >
  >
>({})
