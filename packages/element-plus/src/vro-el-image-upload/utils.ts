import { createFactory } from '@daysnap/utils'

import type { VroElImageUploadProps } from './types'

export const [setVroElImageUploadOptions, getVroElImageUploadOptions] = createFactory<
  Partial<Pick<VroElImageUploadProps, 'compressible' | 'upload' | 'imageProps'>>
>({})
