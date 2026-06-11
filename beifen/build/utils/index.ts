export * from './constant'

export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/')
}

export function removeExt(path: string) {
  return path.replace('.js', '')
}
