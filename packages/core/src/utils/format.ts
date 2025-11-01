export function parseNumberString(val: string) {
  return val.replace(/[^\d]/g, '')
}

// /^-?(0|[1-9]\d*)(\.\d{0,2})?$/
export function parseDecimalString(val: string, precision: string | number) {
  const reg = new RegExp(`^-?(?:(0|[1-9]\\d*)(\\.\\d{0,2})?|(\\.\\d{1,2}))$`, 'g')
  // const reg = new RegExp(`^([1-9]\\d*|0)(\\.?\\d{0,${precision}})`, 'g')
  return val.match(reg)?.[0] ?? ''
}
