import type { VroElSchemaFormSchema, VroElSchemaFormSchemaField } from '../vro-el-schema-form'
import type {
  UseVroElTableOptions,
  UseVroElTableRawColumns,
  UseVroElTableTask,
} from './useVroElTable'
import { useVroElTable } from './useVroElTable'

export interface CreateUseVroElTable<Row extends Record<string, any> = any> {
  <
    R extends VroElSchemaFormSchema,
    S extends VroElSchemaFormSchema = { [P in keyof R]: VroElSchemaFormSchemaField },
  >(
    rowSchema: (() => R) | R,
    rawColumns: UseVroElTableRawColumns<Row>,
    task: UseVroElTableTask<Row>,
    options?: UseVroElTableOptions<Row>,
  ): ReturnType<typeof useVroElTable<Row, R, S>>
}

export function createUseVroElTable<
  Row extends Record<string, any> = any,
>(): CreateUseVroElTable<Row> {
  return useVroElTable as CreateUseVroElTable<Row>
}
