import { markRaw } from 'vue'

import type { TranslatePair } from '../locale'
import { useVroElGlobalConfig } from '../vro-el-config-provider'
import {
  showVroElSchemaFormDialog,
  type VroElSchemaFormDialogProps,
} from '../vro-el-schema-form-dialog'
import type { VroElSchemaDescsProps, VroElSchemaDescsSchema } from './types'
import VroElSchemaDescs from './vro-el-schema-descs.vue'

export interface VroElSchemaDescsDialogOptions
  extends Partial<Omit<VroElSchemaDescsProps, 'schema' | 'data'>> {
  /**
   * 透传给 VroElSchemaFormDialog 的属性，不包含 schema。
   */
  dialogProps?: Partial<Omit<VroElSchemaFormDialogProps, 'schema'>>
}

export type VroElSchemaDescsDialog<T = any> = (
  data: T,
  options?: VroElSchemaDescsDialogOptions,
) => Promise<any>

const VroElSchemaDescsRaw = markRaw(VroElSchemaDescs)

// 命令式调用可能不在组件上下文中，这里读取全局 locale
const getCloseText = () => {
  const { el } = useVroElGlobalConfig().value.locale
  const text = (el.schemaDescs as TranslatePair | undefined)?.closeText
  return typeof text === 'string' ? text : undefined
}

export function createVroElSchemaDescsDialog<T = any>(
  schema: VroElSchemaDescsSchema<T> | ((data: T) => VroElSchemaDescsSchema<T>),
  options: VroElSchemaDescsDialogOptions = {},
): VroElSchemaDescsDialog<T> {
  return (data, opts = {}) => {
    // dialogProps、descProps 均为浅合并，嵌套属性需要整体传入
    const { dialogProps, descProps, itemProps, ...rest } = Object.assign({}, options, opts, {
      dialogProps: { ...options.dialogProps, ...opts.dialogProps },
      descProps: { ...options.descProps, ...opts.descProps },
      itemProps: { ...options.itemProps, ...opts.itemProps },
    })

    return showVroElSchemaFormDialog({
      // 详情场景默认只读，需要确认按钮时通过 dialogProps 打开
      showConfirmButton: false,
      cancelButtonText: getCloseText(),
      ...dialogProps,
      // 内部 schema 放在最后，避免被 dialogProps 覆盖
      schema: {
        details: {
          is: VroElSchemaDescsRaw,
          props: {
            ...rest,
            data,
            schema,
            descProps,
            itemProps,
          },
        },
      },
    })
  }
}
