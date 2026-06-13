export function defineVroElSchemaFormFieldTrigger(
  request: (ctx: {
    confirm: (...args: any[]) => void
    hide: (reason?: any) => void
    block: () => void
  }) => any,
) {
  return request
}
