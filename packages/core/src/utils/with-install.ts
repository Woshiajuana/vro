import type { App, Plugin } from 'vue'

export type WithInstall<T> = T & Plugin

export const withInstall = <T>(main: any): WithInstall<T> => {
  ;(main as WithInstall<T>).install = (app: App): void => {
    app.component(main.name, main)
  }

  return main
}
