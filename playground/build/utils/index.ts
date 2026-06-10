export * from './constant'

export const normalizePath = (value: string) => value.replace(/\\/g, '/')

export const toFsImportPath = (value: string) => `/@fs/${normalizePath(value)}`
