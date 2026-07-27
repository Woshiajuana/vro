export type ExtractComponentProps<T> = T extends new (...args: any[]) => { $props: infer P }
  ? P
  : Record<string, any>
