import { fileURLToPath } from 'node:url'

export const ROOT = fileURLToPath(new URL('../..', import.meta.url))
export const PACKAGES_DIR = fileURLToPath(new URL('../../../packages', import.meta.url))

export const PACKAGE_NAMES = ['core', 'element-plus', 'vant'] as const

export type PackageName = (typeof PACKAGE_NAMES)[number]
