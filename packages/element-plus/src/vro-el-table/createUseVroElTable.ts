import type { VroElSchemaFormSchema } from '../vro-el-schema-form'
import type { VroElTableRequest } from './types'
import type { UseVroElTableOptions, UseVroElTableRawColumns } from './useVroElTable'
import { useVroElTable } from './useVroElTable'

export interface CreateUseVroElTable<Row extends Record<string, any> = any> {
  <R extends VroElSchemaFormSchema>(
    rowSchema: (() => R) | R,
    rawColumns: UseVroElTableRawColumns<Row>,
    request: VroElTableRequest<Row>,
    options?: UseVroElTableOptions<Row>,
  ): ReturnType<typeof useVroElTable<Row, R>>
}

export function createUseVroElTable<
  Row extends Record<string, any> = any,
>(): CreateUseVroElTable<Row> {
  return useVroElTable as CreateUseVroElTable<Row>
}
