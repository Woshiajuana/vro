export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Locale = {
  name: string
  el: TranslatePair
}
