export function parseNumberString(val: string) {
  return val.replace(/[^\d]/g, '')
}

export function parseDecimalString(
  val: string,
  options: { precision?: number; allowNegativeNumber?: boolean } = {},
) {
  const { precision = 0, allowNegativeNumber = true } = options

  // const reg = new RegExp(`^-?(0|[1-9]\\d*)?(\\.\\d{0,${precision}})?`, 'g')
  const reg1 = new RegExp(
    `^${allowNegativeNumber ? '-?' : ''}(0|[1-9]\\d*)?${+precision === 0 ? '' : `(\\.?\\d{0,${precision}})?`}`,
    'g',
  )

  const reg = new RegExp(`^-?(?:(?:[1-9]\\d*|0)(?:\\.\\d{0,2})?|\\d+\\.\\d{0,${precision}})$`, 'g')

  val = val.match(reg)?.[0] ?? ''

  console.log('parseDecimalString => v ', val)

  if (val.startsWith('0') && !val.startsWith('0.') && val.length > 1) {
    val = `${+val}`
  }

  return val
}

export const createDecimalPattern = (
  options: {
    precision?: number
    allowNegativeNumber?: boolean
  } = {},
) => {
  const { precision = 0, allowNegativeNumber = true } = options
  return (value: string, prevValue: string) => {
    if (allowNegativeNumber && value.startsWith('-')) {
      //
    }

    return value
  }
}
