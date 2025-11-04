import { formatMessage } from '@daysnap/utils'

import { __DEV__ } from './constants'

// global error handler
export const errorHandler = (err: unknown) => {
  const message = formatMessage(err)
  if (message) {
    alert(message)
  }

  // development env 需要抛出异常 方便查看问题
  if (__DEV__) {
    console.error(err)
  }
}
