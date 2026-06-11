import path from 'node:path'

export const CWD_DIR = process.cwd()

export const UI_ROOT_DIR = path.join(CWD_DIR, '..', 'packages/core')
export const UI_DOCS_DIR = path.join(UI_ROOT_DIR, 'docs')
export const UI_SRC_DIR = path.join(UI_ROOT_DIR, 'src')

export const USE_ROOT_DIR = path.join(CWD_DIR, '..', 'packages/element-plus')
export const USE_SRC_DIR = path.join(USE_ROOT_DIR, 'src')

export const JSSDK_ROOT_DIR = path.join(CWD_DIR, '..', 'packages/vant')
export const JSSDK_SRC_DIR = path.join(JSSDK_ROOT_DIR, 'src')
