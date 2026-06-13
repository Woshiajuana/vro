import { createFactory } from '@daysnap/utils'

import type { VroElFileUploadProps } from './types'

export const [setVroElFileUploadOptions, getVroElFileUploadOptions] = createFactory<
  Partial<Pick<VroElFileUploadProps, 'upload'>>
>({})
